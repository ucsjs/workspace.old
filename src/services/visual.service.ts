import * as path from "path";
import * as fs from "fs";
import * as fg from "fast-glob";
import * as crypto from "crypto";
import { Injectable } from '@nestjs/common';

import { ParserService } from "./parser.service";
import { RegexService } from "./regex.services";

@Injectable()
export class VisualService extends ParserService{
    constructor(
        public regexService: RegexService
    ){
        super(regexService);
    }

    async getComponents(paths: Array<string> = []) {
        let components = [];
        let dependenciesIndex = {};

        for(let key in paths){
            const pathRelative = paths[key];
            const fullpath =  (pathRelative.includes("./")) ? path.resolve(pathRelative) : pathRelative;
        }

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

        for(let key in components){
            components[key] = this.injectDependencies(components[key], dependenciesIndex);
        }

        let exportedComponents = [];

        for(let key in components){
            if(components[key].metadata.importable){
                const importModule = components[key].filename.replace(`${process.cwd()}/`, "").replace(".ts", "");
                const builderModule = importModule.replace(".component", ".template");

                if(fs.existsSync(path.resolve(`${builderModule}.ejs`)))
                    components[key].template = fs.readFileSync(path.resolve(`${builderModule}.ejs`), "utf8");
                
                exportedComponents.push({
                    namespace: components[key].namespace,
                    extends: components[key].extends,
                    sign: components[key].sign,
                    metadata: components[key].metadata,
                    components: components[key].components,
                    template: components[key].template
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
                        metadata: []
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
}
