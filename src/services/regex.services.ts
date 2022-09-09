import { Injectable } from '@nestjs/common';

@Injectable()
export class RegexService {
    getData(regex, contents, legends) {
        let m;
        let data = [];
        let index = -1;

        if(!Array.isArray(regex))
            regex = [regex];

        for(let r of regex){
            while ((m = r.exec(contents)) !== null) {
                if (m.index === r.lastIndex)
                    r.lastIndex++;
                                        
                m.forEach((match, groupIndex) => {
                    if(groupIndex == 0){
                        index++;
                        data[index] = {};
                    }
                    else if(legends.length >= groupIndex && !match.includes("=") && !match.includes(":") && !match.includes("new "))
                        data[index][legends[groupIndex-1]] = match.replace(/["']/isg, "");
                });
            }
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
            }
        }

        return data;
    }
}
