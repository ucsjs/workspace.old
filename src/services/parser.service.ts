import * as fs from "fs";
import * as crypto from "crypto";

import { RegexService } from "./regex.services";

export class ParserService {
    constructor(
        public regexService: RegexService
    ){}

    getData(file: string, $extendsClass: string = "Blueprint", $metadataOverride: boolean = false) {
        const contents = fs.readFileSync(file, "utf8").toString();
        const namespaceRegex = new RegExp(`class (.*?) extends ${$extendsClass}`, "isg");

        if(contents){
            let component: any = {
                filename: file,
                namespace: this.regexService.getData(namespaceRegex, contents, ["name"])[0]?.name,
                publicVars: this.regexService.getData([
                    /public\s_(.*?)[:]\s(.*?)[\s;][=][\s](.*?)[;]/isg,
                    /public\s_(.*?)[:]\s(.*?);/isg
                ], contents, ["name", "type", "default"], true),
                outputs: this.regexService.getData(/this\.output\(["'](.*?)["'],[\s]Type.*?\.(.*?),.*?\)/isg, contents, ["name", "type"], true),
                inputs: this.regexService.getData([
                    /this\.input\(["'](.*?)["'],[\s]Type\.(.*?),.*?\)/isg,
                    /this\.input\(["'](.*?)["'],[\s](.*?),.*?\)/isg
                ], contents, ["name", "type"], true),
                metadata: {}
            };

            for(let key in component.outputs){
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

            if($metadataOverride){
                rawMetadata = this.regexService.getData(/protected override\s__(.*?)[\s]=[\s]["'](.*?)["'];/isg, contents, ["name", "value"]);
                rawMetadataList = this.regexService.getData(/protected override\s__(.*?)[\s]=[\s]\[(.*?)\][;]/isg, contents, ["name", "value"], true);
                rawMetadataBool = this.regexService.getData(/protected override\s__(.*?)[\s]=[\s](.*?);/isg, contents, ["name", "value"], true);
                newMetadataObject = this.regexService.getData(/protected override\s__(.*?)[:]\s(.*?)[\s;][=][\s](.*?)[;]/isg, contents, ["name", "type", "default"], true);
            }
            else{
                rawMetadata = this.regexService.getData(/private\s__(.*?)[\s]=[\s]["'](.*?)["'];/isg, contents, ["name", "value"]);
                rawMetadataList = this.regexService.getData(/private\s__(.*?)[\s]=[\s]\[(.*?)\][;]/isg, contents, ["name", "value"], true);
                rawMetadataBool = this.regexService.getData(/private\s__(.*?)[\s]=[\s](.*?);/isg, contents, ["name", "value"], true);
                newMetadataObject = this.regexService.getData(/private\s__(.*?)[:]\s(.*?)[\s;][=][\s](.*?)[;]/isg, contents, ["name", "type", "default"], true);
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
}
