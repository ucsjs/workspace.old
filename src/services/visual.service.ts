import * as path from "path";
import * as fs from "fs";
import * as fg from "fast-glob";
import * as crypto from "crypto";
import * as ejs from "ejs";
import { Injectable } from '@nestjs/common';

import { ParserService } from "./parser.service";
import { RegexService } from "./regex.services";

@Injectable()
export class VisualService extends ParserService {
    constructor(
        public regexService: RegexService
    ){
        super(regexService);
    }

    async getComponents(paths: Array<string> = [], typesPaths: Array<string> = []) {
        let components = [];
        let dependenciesIndex = {};
        let types = await this.loadTypes(typesPaths);

        const files = await fg(paths, { 
            dot: true, 
            onlyFiles: false, 
            deep: 5, 
            caseSensitiveMatch: false,
            followSymbolicLinks: true,
            absolute: true 
        });
        
        for(let file of files){
            const component = this.getData(file, "Component", true);

            if(component){
                components.push(component);
                dependenciesIndex[component.namespace] = component;
            }
        }

        for(let key in components)
            components[key] = this.injectDependencies(components[key], dependenciesIndex, types);        
        
        let exportedComponents = [];

        for(let key in components){
            if(components[key].metadata.importable || components[key].extends == "VisualObject"){
                const importModule = components[key].filename.replace(`${process.cwd()}/`, "").replace(".ts", "");
                const builderModule = importModule.replace(".component", ".template");
                const medatadaModule = importModule.replace(".component", ".metadata");
                const editorModule = importModule.replace(".component", ".editor");
                let metadataJson = null;

                if(fs.existsSync(path.resolve(`${builderModule}.ejs`)))
                    components[key].template = path.resolve(`${builderModule}.ejs`);

                if(fs.existsSync(path.resolve(`${editorModule}.ejs`)))
                    components[key].editor = path.resolve(`${editorModule}.ejs`);

                if(fs.existsSync(path.resolve(`${medatadaModule}.json`))){
                    try{
                        metadataJson = JSON.parse(fs.readFileSync(path.resolve(`${builderModule}.json`), "utf-8"));
                    }
                    catch(e){}
                }
                
                exportedComponents.push({
                    namespace: components[key].namespace,
                    extends: components[key].extends,
                    sign: components[key].sign,
                    metadata: (metadataJson) ? { ...metadataJson, ...components[key].metadata } : components[key].metadata,
                    components: components[key].components,
                    template: components[key].template,
                    editor: components[key].editor,
                    content: components[key].content,
                    componentsDafaults: components[key]?.componentsDafaults,
                });
            } 
        }

        return exportedComponents;
    }

    async getSubcomponents(paths: Array<string> = [], typesPaths: Array<string> = []){
        const components = [];
        const exportedComponents = [];
        let dependenciesIndex = {};
        let types = await this.loadTypes(typesPaths);

        const files = await fg(paths, { 
            dot: true, 
            onlyFiles: false, 
            deep: 5, 
            caseSensitiveMatch: false,
            followSymbolicLinks: true,
            absolute: true 
        });

        for(let file of files){
            const component = this.getData(file, "UCS", true);

            if(component && (component.extends == "UCS" || component.extends == "Component")){
                components.push(component);
                dependenciesIndex[component.namespace] = component;
            }   
        }

        for(let key in components)
            components[key] = this.injectDependencies(components[key], dependenciesIndex, types);

        for(let key in components){
            const importModule = components[key].filename.replace(`${process.cwd()}/`, "").replace(".ts", "");
            const builderModule = importModule.replace(".component", ".template");
            const medatadaModule = importModule.replace(".component", ".metadata");
            const editorModule = importModule.replace(".component", ".editor");
            let metadataJson = null;

            if(fs.existsSync(path.resolve(`${builderModule}.ejs`)))
                components[key].template = path.resolve(`${builderModule}.ejs`);

            if(fs.existsSync(path.resolve(`${editorModule}.ejs`)))
                components[key].editor = path.resolve(`${editorModule}.ejs`);

            if(fs.existsSync(path.resolve(`${medatadaModule}.json`))){
                try{
                    metadataJson = JSON.parse(fs.readFileSync(path.resolve(`${builderModule}.json`), "utf-8"));
                }
                catch(e){}
            }

            let metadata = (metadataJson) ? { ...metadataJson, ...components[key].metadata } : components[key].metadata;

            if(components[key].extends == "UCS"){
                metadata.namespace = components[key].namespace;
                metadata.group = "Scripts";
                metadata.icon = "fa-solid fa-code";
            }

            if((!metadata.importable && typeof metadata.importable !== "boolean") || metadata.importable === true) {
                exportedComponents.push({
                    namespace: components[key].namespace,
                    extends: components[key].extends,
                    sign: components[key].sign,
                    metadata: metadata,
                    components: components[key].components,
                    template: components[key].template,
                    editor: components[key].editor,
                    content: components[key].content,
                    componentsDafaults: components[key]?.componentsDafaults,
                    properties: components[key]?.publicVars,
                }); 
            }
        }

        return exportedComponents;
    }

    async loadTypes(typesPaths: Array<string> = []){
        const types = {};

        const files = await fg(typesPaths, { 
            dot: true, 
            onlyFiles: false, 
            deep: 5, 
            caseSensitiveMatch: false,
            followSymbolicLinks: true,
            absolute: true 
        });

        for(let file of files){
            const contents = fs.readFileSync(path.resolve(file), "utf-8");
            const typeName = this.regexService.getData(/class (.*?) {/gms, contents, ["name"], true)[0]?.name.trim();
            const publicVars = this.regexService.getData(/public (.*?):[\s](.*?)[\s]= (.*?);/gms, contents, ["name", "type", "value"], true);

            for(let publicVar of publicVars){
                if(!types[typeName])
                    types[typeName] = { default: {} };
            
                switch(publicVar.type){
                    case "Int":
                    case "int":
                    case "number":
                    case "Number":
                        publicVar.value = parseInt(publicVar.value);
                        break;
                    case "Float":
                    case "float":
                        publicVar.value = parseFloat(publicVar.value);
                        break;
                    case "Boolean":
                    case "boolean":
                    case "Bool":
                    case "bool":
                        publicVar.value = (publicVar.value === "true");
                        break;
                    case "object":
                        try{
                            let dataParsed = {};
                            const items = publicVar.value?.replace(/}/, "").replace(/{/, "").split(",");
                            
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
    
                            publicVar.value = dataParsed;
                        }
                        catch(e){}                    
                    break;
                }

                types[typeName].default[publicVar.name] = publicVar.value
            }
        }

        return types
    }

    injectDependencies(component: any, dependenciesIndex: any, types: any){
        if(component.extends != "Component"){
            const parent = dependenciesIndex[component.extends];

            if(parent){
                if(!component.components)
                    component.components = [];

                for(let key in parent.publicVars){
                    if(dependenciesIndex[parent.publicVars[key].type]){
                        const metadata = {};
                        const ignore = ["namespace", "icon", "fixed", "importable"];

                        for(let keyMetadata in dependenciesIndex[parent.publicVars[key].type].metadata){
                            if(!ignore.includes(keyMetadata))
                                metadata[keyMetadata] = dependenciesIndex[parent.publicVars[key].type].metadata[keyMetadata];
                        }

                        for(let keyPublicVar of dependenciesIndex[parent.publicVars[key].type].publicVars){
                            if(dependenciesIndex[keyPublicVar.type])
                                keyPublicVar.editor = dependenciesIndex[keyPublicVar.type].editor;
                        }

                        component.components.push({
                            component: parent.publicVars[key].type,
                            fixed: dependenciesIndex[parent.publicVars[key].type].metadata.fixed || false,
                            icon: dependenciesIndex[parent.publicVars[key].type].metadata.icon,
                            sign: dependenciesIndex[parent.publicVars[key].type].sign,
                            properties: dependenciesIndex[parent.publicVars[key].type].publicVars,
                            default: this.generateDefault(dependenciesIndex[parent.publicVars[key].type].publicVars, types),
                            metadata: metadata,                          
                        });

                        if(dependenciesIndex[parent.publicVars[key].type].editor){
                            if(!component.editor)
                                component.editor = {};
    
                            component.editor[parent.publicVars[key].type] = dependenciesIndex[parent.publicVars[key].type].editor;
                        }
                    }
                }
            }

            for(let key in component.publicVars){
                if(dependenciesIndex[component.publicVars[key].type]){
                    component.components.push({
                        component: component.publicVars[key].type,
                        fixed: dependenciesIndex[component.publicVars[key].type].metadata.fixed || false,
                        icon: dependenciesIndex[component.publicVars[key].type].metadata.icon,
                        sign: dependenciesIndex[component.publicVars[key].type].sign,
                        properties: dependenciesIndex[component.publicVars[key].type].publicVars,
                        default: this.generateDefault(dependenciesIndex[component.publicVars[key].type].publicVars, types),
                        metadata: dependenciesIndex[component.publicVars[key].type].metadata
                    })

                    if(dependenciesIndex[component.publicVars[key].type].editor){
                        if(!component.editor)
                            component.editor = {};

                        component.editor[component.publicVars[key].type] = dependenciesIndex[component.publicVars[key].type].editor;
                    }
                }
            }
        }

        return component;
    }

    generateDefault(list, types){
        let defaultObject = {};

        for(let key in list){
            if(types[list[key].type] && types[list[key].type].default && !list[key].default)
                defaultObject[list[key].name] = types[list[key].type].default;
            else
                defaultObject[list[key].name] = list[key].default;            

            if(defaultObject[list[key].name]?.default)
                defaultObject[list[key].name] = defaultObject[list[key].name].default;

            if(typeof defaultObject[list[key].name] == "object" && defaultObject[list[key].name]['default'] !== undefined)
                defaultObject[list[key].name] = defaultObject[list[key].name]['default'];
        }

        return defaultObject;
    }

    uppercaseFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

    async parse(item, namespace): Promise<string>{
        const metadata = JSON.parse(item.content);
        let result = ""; 

        const dirname = path.dirname(item.filename);
        const basename = path.basename(item.filename, ".ts");

        //Create 
        result +=`import { Module, Controller, Get, Header, StreamableFile } from "@nestjs/common";
import { readFileSync } from 'fs';

@Controller("${namespace}-page")
class ${this.uppercaseFirstLetter(namespace)}PageController {
    @Get()
    @Header('Content-Type', 'text/html')
    async index(){
        return readFileSync('${dirname}/${basename}.html', "utf8");
    }
}

@Module({
    controllers: [${this.uppercaseFirstLetter(namespace)}PageController],
})
export class LazyModule {}`;


        return result;
    }

    async parseTemplate(item, namespace): Promise<string>{
        const metadata = JSON.parse(item.content);

        let injection = {
            meta: [],
            css: [],
            scripts: [],
            jsond: []
        };

        let result = `<!-- Auto-generated by UCS.js (@see https://ucsjs.io) -->
        
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${metadata.title}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
${await this.build(metadata.hierarchy)}
    </body>
</html>`; 

        return result;
    }

    async build(hierarchy, tabsCount = 2){
        let result = "";
        let tabs = "";

        for(let i = 0; i < tabsCount; i++)
            tabs += "\t";
        
        for(let component of hierarchy){
            const subComponents = (component.hierarchy.length > 0) ? await this.build(component.hierarchy, tabsCount+1) : "";
            const componentData = this.getComponentData(component);

            if(component.template){
                const raw = fs.readFileSync(component.template, "utf8");

                const template = ejs.render(raw, {
                    id: component.id,
                    slot: subComponents,
                    ...componentData   
                });

                const lines = template.split("\n");

                for(let line of lines)
                    result += tabs + line + "\n";
            }
            else{
                result += `${tabs}<div ref="${component.id}">${subComponents}</div>\n`;
            }
        }

        return result;
    }

    getComponentData(component){
        let result = {};

        for(let key in component.components)
            result[component.components[key].component] = component.components[key].value;
        
        return result;
    }
}
