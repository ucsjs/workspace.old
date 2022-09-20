import * as fs from "fs";
import * as crypto from "crypto";
import * as path from "path";

import { RegexService } from "./regex.services";

export class ParserService {
    constructor(
        public regexService: RegexService
    ){}

    getData(file: string, $extendsClass: string = "Blueprint", $metadataOverride: boolean = false) {
        const contents = fs.readFileSync(file, "utf8").toString();
        const namespaceRegex = new RegExp(`class (.*?) extends (.*?){`, "isg");
        const classInfo = this.regexService.getData(namespaceRegex, contents, ["name", "extends"], true);
        const content = this.regexService.getDataRaw(/content\(\){.*?return ['"](.*?)['"];/gms, contents)[1];

        if(contents){
            let component: any = {
                filename: file,
                namespace: classInfo[0]?.name,
                extends: classInfo[0]?.extends,
                publicVars: this.regexService.getData([
                    /public\s_(.*?)[:]\s(.*?)[\s;][=][\s](.*?)[;]/isg,
                    /public\s_(.*?)[:]\s(.*?);/isg
                ], contents, ["name", "type", "default"], true),
                outputs: this.regexService.getData(/this\.output\(["'](.*?)["'],[\s]Type.*?\.(.*?),.*?\)/isg, contents, ["name", "type"], true),
                inputs: this.regexService.getData([
                    /this\.input\(["'](.*?)["'],[\s]Type\.(.*?),.*?\)/isg,
                    /this\.input\(["'](.*?)["'],[\s](.*?),.*?\)/isg
                ], contents, ["name", "type"], true),
                content: (content) ? content : null,
                componentsDafaults: this.regexService.getData(/this._(.*?)._(.*?) = (.*?);/gms, contents, ["component", "property", "value"], true),
                metadata: {}
            };

            for(let key in component.outputs){
                component.outputs[key].label = this.fixedLabel(component.outputs.name);
                component.outputs[key].namespace = `${component.namespace}::${component.outputs[key].name}`;
                component.outputs[key].id = crypto
                .createHash("sha1")
                .update(Buffer.from(component.outputs[key].namespace))
                .digest("hex")
            }

            component.outputs = Array.from(new Set(component.outputs.map(a => a.namespace))).map(namespace => {
                return component.outputs.find(a => a.namespace === namespace)
            });

            for(let key in component.inputs){
                component.inputs[key].label = this.fixedLabel(component.inputs[key].name);
                component.inputs[key].namespace = `${component.namespace}::${component.inputs[key].name}`;
                component.inputs[key].id = crypto
                .createHash("sha1")
                .update(Buffer.from(component.inputs[key].namespace))
                .digest("hex")
            }

            component.inputs = Array.from(new Set(component.inputs.map(a => a.namespace))).map(namespace => {
                return component.inputs.find(a => a.namespace === namespace)
            });

            for(let key in component.publicVars){
                const changeStyle = this.regexService.getData(new RegExp(`private _${component.publicVars[key].name}ChangeStyle = (.*?);`, "gms"), contents, ["data"], true)[0];
                
                if(changeStyle)
                    component.publicVars[key].changeStyle = changeStyle.data;

                component.publicVars[key].label = this.fixedLabel(component.publicVars[key].name);
                component.publicVars[key].namespace = `${component.namespace}::${component.publicVars[key].name}`;
                component.publicVars[key].id = crypto
                .createHash("sha1")
                .update(Buffer.from(component.publicVars[key].namespace))
                .digest("hex")
            }

            component.publicVars = Array.from(new Set(component.publicVars.map(a => a.namespace))).map(namespace => {
                return component.publicVars.find(a => a.namespace === namespace)
            });

            let rawMetadata = [];
            let rawMetadataList = [];
            let rawMetadataBool = [];
            let newMetadataObject = [];

            rawMetadata = this.regexService.getData(/private\s__(.*?)[\s]=[\s]["'](.*?)["'];/isg, contents, ["name", "value"], true);
            rawMetadataList = this.regexService.getData(/private\s__(.*?)[\s]=[\s]\[(.*?)\][;]/isg, contents, ["name", "value"], true);
            rawMetadataBool = this.regexService.getData(/private\s__(.*?)[\s]=[\s](.*?);/isg, contents, ["name", "value"], true);
            newMetadataObject = this.regexService.getData(/private\s__(.*?)[:]\s(.*?)[\s;][=][\s](.*?)[;]/isg, contents, ["name", "type", "default"], true);
        
            if($metadataOverride){
                const rawMetadataOverride = this.regexService.getData(/protected override\s__(.*?)[\s]=[\s]["'](.*?)["'];/isg, contents, ["name", "value"], true);
                const rawMetadataListOverride = this.regexService.getData(/protected override\s__(.*?)[\s]=[\s]\[(.*?)\][;]/isg, contents, ["name", "value"], true);
                const rawMetadataBoolOverride = this.regexService.getData(/protected override\s__(.*?)[\s]=[\s](.*?);/isg, contents, ["name", "value"], true);
                const newMetadataObjectOverride = this.regexService.getData(/protected override\s__(.*?)[:]\s(.*?)[\s;][=][\s](.*?)[;]/isg, contents, ["name", "type", "default"], true);
                
                rawMetadata = rawMetadata.concat(rawMetadataOverride);
                rawMetadataList = rawMetadataList.concat(rawMetadataListOverride);
                rawMetadataBool = rawMetadataBool.concat(rawMetadataBoolOverride);
                newMetadataObject = newMetadataObject.concat(newMetadataObjectOverride);
            }
            
            let metadata = {};

            for(let meta of rawMetadata)
                if(meta.name && meta.value)
                    metadata[meta.name] = meta.value;

            for(let meta of rawMetadataList){
                if(meta.name && meta.value){
                    metadata[meta.name] = meta.value
                    .split(",")
                    .map((v) => v.trim());
                }
            }

            for(let meta of rawMetadataBool){
                if(meta.name && meta.value && meta.value == "true" || meta.value == "false")
                    metadata[meta.name] = (meta.value == "true");
            }

            for(let meta of newMetadataObject){
                if(meta.name && meta.default)
                    metadata[meta.name] = meta.default;
            }

            const medatadaModule = file.replace(".component", ".metadata").replace(".ts", "");
         
            if(fs.existsSync(path.resolve(`${medatadaModule}.json`))){
                try{
                    const metadataJson = JSON.parse(fs.readFileSync(path.resolve(`${medatadaModule}.json`), "utf-8"));
                    metadata = { ...metadata, ...metadataJson };
                }
                catch(e){}
            }

            for(let keyPublicVar in component.publicVars){
                try{
                    if(
                        component.publicVars[keyPublicVar].default && 
                        component.publicVars[keyPublicVar].default?.includes("{") && 
                        component.publicVars[keyPublicVar].default?.includes("}")
                    ){
                        try{
                            let object = null;
                            eval(`object = ${component.publicVars[keyPublicVar].default};`);

                            if(object)
                                component.publicVars[keyPublicVar].default = object;
                        }
                        catch(e){}
                    }
                }
                catch(e){}
            }

            component.metadata = metadata;
            
            component.sign = crypto.createHash("sha1")
            .update(Buffer.from(JSON.stringify(component)))
            .digest("hex");

            return component
        }
        
        return null;
    }

    uppercaseFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

    fixedLabel(value){
        return this.uppercaseFirstLetter(value.replace(/([A-Z])/g, " $1"));
    }
}
