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

    async getComponents(paths: Array<string> = []) {
        let components = [];
        let dependenciesIndex = {};

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
            components[key] = this.injectDependencies(components[key], dependenciesIndex);
        
        let exportedComponents = [];

        for(let key in components){
            if(components[key].metadata.importable || components[key].extends == "VisualObject"){
                const importModule = components[key].filename.replace(`${process.cwd()}/`, "").replace(".ts", "");
                const builderModule = importModule.replace(".component", ".template");
                const medatadaModule = importModule.replace(".component", ".metadata");
                let metadataJson = null;

                if(fs.existsSync(path.resolve(`${builderModule}.ejs`)))
                    components[key].template = path.resolve(`${builderModule}.ejs`);

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
                    content: components[key].content,
                    componentsDafaults: components[key]?.componentsDafaults,
                });
            } 
        }

        return exportedComponents;
    }

    injectDependencies(component: any, dependenciesIndex: any){
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

                        component.components.push({
                            component: parent.publicVars[key].type,
                            fixed: dependenciesIndex[parent.publicVars[key].type].metadata.fixed || false,
                            icon: dependenciesIndex[parent.publicVars[key].type].metadata.icon,
                            sign: dependenciesIndex[parent.publicVars[key].type].sign,
                            properties: dependenciesIndex[parent.publicVars[key].type].publicVars,
                            default: this.generateDefault(dependenciesIndex[parent.publicVars[key].type].publicVars),
                            metadata: metadata                          
                        })
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
                        default: this.generateDefault(dependenciesIndex[component.publicVars[key].type].publicVars),
                        metadata: dependenciesIndex[component.publicVars[key].type].metadata
                    })
                }
            }
        }

        return component;
    }

    generateDefault(list){
        let defaultObject = {};

        for(let key in list){
            defaultObject[list[key].name] = list[key].default;
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

        let result = `<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${metadata.title}</title>
        <meta charset="utf-8">
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
