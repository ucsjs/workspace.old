import { Injectable } from '@nestjs/common';

@Injectable()
export class RegexService {
    getData(regex, contents, legends, parseline = false) {
        let data = [];

        if(!Array.isArray(regex))
            regex = [regex];

        if(parseline){
            const lines = contents.split(/\n/);

            for(let line of lines)
                data = data.concat(this.exec(regex, line, legends));
        }
        else{
            data = this.exec(regex, contents, legends);
        }

        for(let item of data){
            switch(item.type){
                case "Int":
                case "int":
                case "number":
                case "Number":
                    item.default = parseInt(item.default);
                    break;
                case "Float":
                case "float":
                    item.default = parseFloat(item.default);
                    break;
                case "Boolean":
                case "boolean":
                case "Bool":
                case "bool":
                    item.default = (item.default === "true");
                    break;
                case "object":
                    try{
                        let dataParsed = {};

                        const items = item.default?.replace(/}/, "").replace(/{/, "").split(",");
                        
                        if(items){
                            for(let i of items){
                                const [key, value] = i?.trim().split(":");
    
                                if(value){
                                    if(value.trim() === "true" || value.trim() === "false")
                                        dataParsed[key.trim()] = (value.trim() === "true");
                                    else if(!isNaN(parseInt(value.trim())))
                                        dataParsed[key.trim()] = parseInt(value.trim());
                                    else
                                        dataParsed[key.trim()] = value.trim();
                                }   
                            }
                        }

                        item.default = dataParsed;
                    }
                    catch(e){
                        try{
                            eval(`item.default = ${item.default}`);
                        }
                        catch(e){}
                    }                    
                break;
            }
        }

        return data;
    }

    exec(regex, contents, legends){
        let m;
        let data = [];
        let index = -1;

        for(let r of regex){
            while ((m = r.exec(contents)) !== null) {
                if (m.index === r.lastIndex)
                    r.lastIndex++;
                                        
                m.forEach((match, groupIndex) => {
                    if(groupIndex == 0){
                        index++;
                        data[index] = {};
                    }
                    else if(legends.length >= groupIndex && !match.includes("=") && !match.includes("new ")){
                        if(match.includes("{") && match.includes("}")){
                            data[index][legends[groupIndex-1].trim()] = {}

                            try{ eval(`data[index][legends[groupIndex-1].trim()] = ${match}`); }
                            catch(e){}
                        }
                        else
                            data[index][legends[groupIndex-1].trim()] = match.replace(/["']/isg, "").trim();
                    }
                        
                });
            }
        }

        return data;
    }

    getDataRaw(regex, contents){
        let m;
        let data = [];
        let index = -1;

        while ((m = regex.exec(contents)) !== null) {
            if (m.index === regex.lastIndex)
            regex.lastIndex++;
                                    
            m.forEach((match, groupIndex) => {
                index++;
                data[groupIndex] = match;
            });
        }

        return data;
    }
}
