import * as path from "path";
import * as fs from "fs";
import * as fg from "fast-glob";
import { Injectable } from '@nestjs/common';
import { Parser } from "@ucsjs/blueprint";

import { DefaultParser } from "./default.parser";
import { RegexService } from "../services/regex.services";

@Injectable()
export class DefaultBlueprintParser extends DefaultParser{
    constructor(
        public regexService: RegexService
    ){
        super(regexService);
    }

    async getBlueprints(paths: Array<string> = []) {
        let blueprints = [];

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
            const blueprint = this.getData(file);

            if(blueprint && !blueprint.metadata.private)
                blueprints.push(blueprint);
        }

        return blueprints;
    }

    uppercaseFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

    async parse(item, namespace): Promise<string>{
        const parser = new Parser(`${this.uppercaseFirstLetter(namespace)}Blueprint`, JSON.parse(item.content), [
            path.resolve("./src/blueprints/**/*.blueprint.ts"),
            path.resolve("packages/**/*.blueprint.ts"),
            path.resolve("./src/workspace/**/*.blueprint.ts"),
        ], path.resolve("."));

        const metadata = JSON.parse(item.content);

        let imports = [];

        let moduleInjection = {
            imports: [],
            importsModule: [],
            exports: [],
            providers: [],
            constructors: [],
            controllers: [],
            extras: [],
            metadata: [],
            args: [],
            events: [],
            flows: []
        };

        let moduleExtra = "";

        //Load depencencies 
        let stateId = new Date().getTime();
        let dependencies: any = await this.loadDependencies(metadata.items, namespace, stateId, metadata.connections);
            
        if(typeof dependencies === "object" || Array.isArray(dependencies)){
            for(let dependency of dependencies){
                if(dependency.imports)
                    moduleInjection.imports = moduleInjection.imports.concat(dependency.imports);
        
                if(dependency.importsModule)
                    moduleInjection.importsModule = moduleInjection.importsModule.concat(dependency.importsModule);
    
                if(dependency.exports)
                    moduleInjection.exports = moduleInjection.exports.concat(dependency.exports);
    
                if(dependency.providers)
                    moduleInjection.providers = moduleInjection.providers.concat(dependency.providers);

                if(dependency.constructors)
                    moduleInjection.constructors.push(dependency.constructors);
                
                if(dependency.controllers)
                    moduleInjection.controllers = moduleInjection.controllers.concat(dependency.controllers);

                if(dependency.args)
                    moduleInjection.args = moduleInjection.args.concat(dependency.args);

                if(dependency.events)
                    moduleInjection.events = moduleInjection.events.concat(dependency.events);

                if(dependency.flows)
                    moduleInjection.flows = moduleInjection.flows.concat(dependency.flows);
            }

            moduleInjection = JSON.parse(JSON.stringify(moduleInjection));
        }

        //Load module
        for(let itemKey in metadata.items){
            const item = metadata.items[itemKey];

            if(!imports.includes(item.namespace)) {                
                const importModule = item.filename.replace(`${process.cwd()}/`, "").replace(".ts", "");
                const builderModule = importModule.replace(".blueprint", ".builder");

                if(fs.existsSync(path.resolve(`${builderModule}.ts`))){
                    try{
                        const builder = require(path.resolve(`${builderModule}.ts`)).default;
                        const moduleData = await builder(item, `${this.uppercaseFirstLetter(namespace)}Blueprint`, itemKey, moduleInjection, stateId, metadata.items, metadata.connections);
                        
                        if(typeof moduleData == "string")
                            moduleExtra += moduleData;
                        else if(typeof moduleData == "object"){
                            if(moduleData.extras)
                                moduleInjection.extras = moduleInjection.extras.concat(moduleData.extras);
                        }
                    }
                    catch(e){}
                }
            }
        }

        let result = await parser.export();
        let $impots = "";
        let $extra = "";

        if(moduleExtra)
            $impots += moduleExtra;

        if(
            moduleInjection.imports.length > 0 || 
            moduleInjection.importsModule.length > 0 ||
            moduleInjection.exports.length > 0 ||
            moduleInjection.controllers.length > 0 ||
            moduleInjection.providers.length > 0
        ){
            if(moduleInjection && moduleInjection.imports){
                let imports = [...new Set(moduleInjection.imports)];

                for(let importModule of imports)
                    $impots += `${importModule}\n`;

                $impots += `{{extra}}\n`;
            }

            result = result.replace("{{imports}}", $impots);
    
            if(moduleInjection && moduleInjection.extras){
                for(let moduleExtra of moduleInjection.extras)
                    $extra += `${moduleExtra}\n`;
            }

            result = result.replace("{{extra}}", $extra);

            if(moduleInjection.args.length > 0)
                result = result.replace("{{args}}", `args = (typeof args === "object") ? { ...args, ...${moduleInjection.args} } : ${moduleInjection.args}`);
            else
                result = result.replace("{{args}}", "");

            //Events
            if(moduleInjection.events.length > 0)
                result = result.replace("{{events}}", "\n" + moduleInjection.events.join("\n\n"));
            else
                result = result.replace("{{events}}", "");

            //Events
            if(moduleInjection.flows.length > 0)
                result = result.replace("{{flows}}", "\n" + moduleInjection.flows.join("\n\n"));
            else
                result = result.replace("{{flows}}", "");
            
            if(
                moduleInjection.importsModule.length > 0 ||
                moduleInjection.exports.length > 0 ||
                moduleInjection.controllers.length > 0 ||
                moduleInjection.providers.length > 0 
            ){
                let $Module: any = {};

                if(moduleInjection.importsModule.length > 0)
                    $Module.imports = moduleInjection.importsModule;

                if(moduleInjection.exports.length > 0)
                    $Module.exports = moduleInjection.exports;
                
                if(moduleInjection.controllers.length > 0)
                    $Module.controllers = moduleInjection.controllers;

                if(moduleInjection.providers.length > 0)
                    $Module.providers = moduleInjection.providers;

                result +=`
import { Module } from "@nestjs/common";
@Module(${JSON.stringify($Module).replace(/["']/img, "")})
export class LazyModule {}`;
            }
        }

        return result;
    }

    async loadDependencies(items, namespace, stateId, connections){
        let imports = [];
        let dependencies = [];

        for(let itemKey in items){
            const item = items[itemKey];

            if(!imports.includes(item.namespace)) {
                const importModule = item.filename.replace(`${process.cwd()}/`, "").replace(".ts", "");
                const builderModule = importModule.replace(".blueprint", ".builder");               

                if(fs.existsSync(path.resolve(`${builderModule}.ts`))){
                    try{
                        const builder = require(path.resolve(`${builderModule}.ts`)).default;
                        const moduleData = await builder(item, `${this.uppercaseFirstLetter(namespace)}Blueprint`, itemKey, null, stateId, items, connections);
                        
                        if(typeof moduleData == "object")
                            dependencies.push(moduleData)
                    }
                    catch(e){}
                }
            }
        }

        return dependencies;
    }
}
