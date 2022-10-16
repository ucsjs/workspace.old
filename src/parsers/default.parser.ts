import * as fs from "fs";
import * as crypto from "crypto";
import * as path from "path";
import * as imageToUri from "image-to-uri";

import { RegexService } from "../services/regex.services";

export class DefaultParser {
    constructor(
        public regexService: RegexService
    ){}

    getData(file: string, $extendsClass: string = "Blueprint", $metadataOverride: boolean = false) {
        const contents = fs.readFileSync(file, "utf8").toString();
        let namespaceRegex = null;

        if($extendsClass == "*")
            namespaceRegex = new RegExp(`class (.*?) extends (.*?){`, "isg");
        else
            namespaceRegex = new RegExp(`class (.*?) extends ${$extendsClass}`, "isg");

        const classInfo = this.regexService.getData(namespaceRegex, contents, ["name", "extends"], true);
        const content = this.regexService.getDataRaw(/content\(\){.*?return ['"`](.*?)['"`];/gms, contents)[1];

        if(contents){
            let component: any = {
                filename: file,
                namespace: classInfo[0]?.name,
                extends: (classInfo[0]?.extends) ? classInfo[0].extends : $extendsClass,
                publicVars: this.regexService.getData([
                    /public\s_(.*?)[:]\s(.*?)[\s;][=][\s](.*?)[;]/isg,
                    /public\s_(.*?)[:]\s(.*?);/isg
                ], contents, ["name", "type", "default"], true),
                outputs: this.regexService.getData(/this\.output\(["'](.*?)["'],[\s](.*?),.*?\)/isg, contents, ["name", "type"], true),
                inputs: this.regexService.getData(/this\.input\(["'](.*?)["'],[\s](.*?),.*?\)/isg, contents, ["name", "type"], true),
                events: this.regexService.getData(/this\.event\(["'](.*?)["']\)/isg, contents, ["name"], true),
                content: (content) ? content : null,
                componentsDefaults: this.regexService.getData(/this._(.*?)._(.*?) = (.*?);/gms, contents, ["component", "property", "value"]),
                metadata: {}
            };

            //Outputs
            for(let key in component.outputs){
                if(
                    component.outputs[key] && 
                    typeof component.outputs[key].type == "string" && 
                    typeof component.outputs[key].type?.includes == "function" &&
                    component.outputs[key].type?.includes("Type.")
                ) {
                    component.outputs[key].type = component.outputs[key].type.replace("Type.", "");
                }
                
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

            //Inputs
            for(let key in component.inputs){
                if(
                    component.inputs[key] &&
                    typeof component.inputs[key].type == "string" && 
                    typeof component.inputs[key].type?.includes == "function" &&
                    component.inputs[key].type?.includes("Type.")
                ) {
                    component.inputs[key].type = component.inputs[key].type.replace("Type.", "");
                }
                
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

            //Events
            for(let key in component.events)
                component.events[key].type = "Event";

            //Public vars
            for(let key in component.publicVars){
                const changeStyle = this.regexService.getData(new RegExp(`private _${component.publicVars[key].name}ChangeStyle = (.*?);`, "gms"), contents, ["data"], true)[0];
                
                if(changeStyle)
                    component.publicVars[key].changeStyle = changeStyle.data;

                component.publicVars[key].label = this.fixedLabel(component.publicVars[key].name).replace('Border ', '');
                component.publicVars[key].namespace = `${component.namespace}::${component.publicVars[key].name}`;
                component.publicVars[key].id = crypto
                .createHash("sha1")
                .update(Buffer.from(component.publicVars[key].namespace))
                .digest("hex")
            }

            component.publicVars = Array.from(new Set(component.publicVars.map(a => a.namespace))).map(namespace => {
                return component.publicVars.find(a => a.namespace === namespace)
            });

            //Medatada
            let rawMetadata = [];
            let rawMetadataList = [];
            let rawMetadataBool = [];
            let newMetadataObject = [];
            let rawMetadataFormater = [];

            rawMetadata = this.regexService.getData(/private\s__(.*?)[\s]=[\s]["'](.*?)["'];/isg, contents, ["name", "value"], true);
            rawMetadataList = this.regexService.getData(/private\s__(.*?)[\s]=[\s]\[(.*?)\][;]/isg, contents, ["name", "value"], true);
            rawMetadataBool = this.regexService.getData(/private\s__(.*?)[\s]=[\s](.*?);/isg, contents, ["name", "value"], true);
            newMetadataObject = this.regexService.getData(/private\s__(.*?)[:]\s(.*?)[\s;][=][\s](.*?)[;]/isg, contents, ["name", "type", "default"], true);
            rawMetadataFormater = this.regexService.getDataWithoutParserType(/private\s__(.*?)[\s]=[\s]["'](.*?)["'];/isg, contents, ["name", "value"]);
        
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
            
            let metadata: any = {};

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

            for(let meta of rawMetadataFormater){
                if(meta.name && meta.value && meta.name.toLowerCase().includes('formater'))
                    metadata[meta.name] = meta.value;
            }       

            //Metadata File
            const medatadaModule = file.replace(".component", ".metadata").replace(".ts", "");
         
            if(fs.existsSync(path.resolve(`${medatadaModule}.json`))){
                try{
                    const metadataJson = JSON.parse(fs.readFileSync(path.resolve(`${medatadaModule}.json`), "utf-8"));
                    metadata = { ...metadata, ...metadataJson };
                }
                catch(e){}
            }

            //Metadata File
            const medatadaModuleBlueprint = file.replace(".blueprint", ".metadata").replace(".ts", "");
         
            if(fs.existsSync(path.resolve(`${medatadaModuleBlueprint}.json`))){
                try{
                    const metadataJson = JSON.parse(fs.readFileSync(path.resolve(`${medatadaModuleBlueprint}.json`), "utf-8"));
                    metadata = { ...metadata, ...metadataJson };
                }
                catch(e){}
            }

            //Editor File
            const editorModule = file.replace(".component", ".editor").replace(".ts", "");
         
            if(fs.existsSync(path.resolve(`${editorModule}.json`))){
                try{
                    const editorSettings = JSON.parse(fs.readFileSync(path.resolve(`${editorModule}.json`), "utf-8"));

                    for(let key in editorSettings){
                        const rawEditor = fs.readFileSync(path.resolve(editorSettings[key]), "utf-8");
                        const content = this.regexService.getDataRaw(/<template>(.*?)<\/template>/isg, rawEditor)[1];
                        const style = this.regexService.getDataRaw(/<style>(.*?)<\/style>/isg, rawEditor)[1];
                        const script = this.regexService.getDataRaw(/<script>.*?export default (.*?)<\/script>/isg, rawEditor)[1];
                        editorSettings[key] = { content, style, script };
                    }

                    component.editor = editorSettings;
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

            for(let keyMetadata in metadata){
                if(keyMetadata == "headerIcon" && metadata[keyMetadata]?.icon) {
                    metadata[keyMetadata] = metadata[keyMetadata]?.icon;
                }
                else if(
                    keyMetadata == "headerIcon" && 
                    typeof metadata[keyMetadata] == "string" && 
                    metadata[keyMetadata].includes("/")
                ){
                    try{
                        metadata[keyMetadata] = imageToUri(path.resolve(metadata[keyMetadata]));
                    }
                    catch(e){}
                }  

                //Sufix
                if(keyMetadata.includes("Sufix")){
                    const [componentName, propertyName] = keyMetadata.split("_");
    
                    component.componentsDefaults.push({
                        "component": componentName,
                        "property": propertyName,
                        "value": metadata[keyMetadata]
                    });
                }
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
        return (typeof value == "string") ? this.uppercaseFirstLetter(value?.replace(/([A-Z])/g, " $1")) : '';
    }

    generateSign(component){
        return crypto.createHash("sha1")
        .update(Buffer.from(JSON.stringify(component)))
        .digest("hex")
    }
}
