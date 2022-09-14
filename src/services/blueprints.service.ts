import * as path from "path";
import * as fs from "fs";
import * as fg from "fast-glob";
import * as crypto from "crypto";
import { Injectable } from '@nestjs/common';
import { Parser } from "@ucsjs/blueprint";

import { RegexService } from "./regex.services";

@Injectable()
export class BlueprintsService {
    constructor(
        private regexService: RegexService
    ){}

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
            const contents = fs.readFileSync(file, "utf8").toString();

            if(contents){
                let blueprint: any = {
                    filename: file,
                    namespace: this.regexService.getData(/class (.*?) extends Blueprint/isg, contents, ["name"])[0]?.name,
                    publicVars: this.regexService.getData(/public\s_(.*?)[:]\s(.*?)[\s;][=][\s](.*?)[;]/isg, contents, ["name", "type", "default"], true),
                    outputs: this.regexService.getData(/this\.output\(["'](.*?)["'],[\s]Type.*?\.(.*?),.*?\)/isg, contents, ["name", "type"], true),
                    inputs: this.regexService.getData([
                        /this\.input\(["'](.*?)["'],[\s]Type\.(.*?),.*?\)/isg,
                        /this\.input\(["'](.*?)["'],[\s](.*?),.*?\)/isg
                    ], contents, ["name", "type"], true),
                    metadata: {}
                };

                for(let key in blueprint.outputs){
                    blueprint.outputs[key].namespace = `${blueprint.namespace}::${blueprint.outputs[key].name}`;
                    blueprint.outputs[key].id = crypto
                    .createHash("sha1")
                    .update(Buffer.from(blueprint.outputs[key].namespace))
                    .digest("hex")
                }

                blueprint.outputs = Array.from(new Set(blueprint.outputs.map(a => a.namespace))).map(namespace => {
                    return blueprint.outputs.find(a => a.namespace === namespace)
                });

                for(let key in blueprint.inputs){
                    blueprint.inputs[key].namespace = `${blueprint.namespace}::${blueprint.inputs[key].name}`;
                    blueprint.inputs[key].id = crypto
                    .createHash("sha1")
                    .update(Buffer.from(blueprint.inputs[key].namespace))
                    .digest("hex")
                }

                blueprint.inputs = Array.from(new Set(blueprint.inputs.map(a => a.namespace))).map(namespace => {
                    return blueprint.inputs.find(a => a.namespace === namespace)
                });

                for(let key in blueprint.publicVars){
                    blueprint.publicVars[key].namespace = `${blueprint.namespace}::${blueprint.publicVars[key].name}`;
                    blueprint.publicVars[key].id = crypto
                    .createHash("sha1")
                    .update(Buffer.from(blueprint.publicVars[key].namespace))
                    .digest("hex")
                }

                blueprint.publicVars = Array.from(new Set(blueprint.publicVars.map(a => a.namespace))).map(namespace => {
                    return blueprint.publicVars.find(a => a.namespace === namespace)
                });

                const rawMetadata = this.regexService.getData(/private\s__(.*?)[\s]=[\s]["'](.*?)["'];/isg, contents, ["name", "value"]);
                const rawMetadataList = this.regexService.getData(/private\s__(.*?)[\s]=[\s]\[(.*?)\][;]/isg, contents, ["name", "value"], true);
                const rawMetadataBool = this.regexService.getData(/private\s__(.*?)[\s]=[\s](.*?);/isg, contents, ["name", "value"], true);
                const newMetadataObject = this.regexService.getData(/private\s__(.*?)[:]\s(.*?)[\s;][=][\s](.*?)[;]/isg, contents, ["name", "type", "default"], true);
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

                blueprint.metadata = metadata;
                
                blueprint.sign = crypto.createHash("sha1")
                .update(Buffer.from(JSON.stringify(blueprint)))
                .digest("hex");

                blueprints.push(blueprint);
            }
        }
        

        return blueprints;
    }

    uppercaseFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

    async parse(item, namespace){
        const parser = new Parser(`${this.uppercaseFirstLetter(namespace)}Blueprint`, JSON.parse(item.content), [
            path.resolve("./src/blueprints/**/*.blueprint.ts"),
            path.resolve("node_modules/@ucsjs/**/*.blueprint.ts"),
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
            extras: []
        };

        let moduleExtra = "";

        //Load depencencies 
        let stateId = new Date().getTime();
        let dependencies: any = await this.loadDependencies(metadata.items, namespace, stateId);
            
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
            }

            moduleInjection = JSON.parse(JSON.stringify(moduleInjection));
        }

        //Load module
        for(let itemKey in metadata.items){
            const item = metadata.items[itemKey];

            if(!imports.includes(item.namespace) && item.namespace != "OutputBlueprint") {                
                const importModule = item.filename.replace(`${process.cwd()}/`, "").replace(".ts", "");
                const builderModule = importModule.replace(".blueprint", ".builder");

                if(fs.existsSync(path.resolve(`${builderModule}.ts`))){
                    try{
                        const builder = require(path.resolve(`${builderModule}.ts`)).default;
                        const moduleData = await builder(item, `${this.uppercaseFirstLetter(namespace)}Blueprint`, itemKey, moduleInjection, stateId);
                        
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

        if(moduleExtra)
            result += moduleExtra;

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
                    result += `${importModule}\n`;
            }
    
            if(moduleInjection && moduleInjection.extras){
                for(let moduleExtra of moduleInjection.extras)
                    result += `${moduleExtra}\n`;
            }

            result +=`import { Module } from "@nestjs/common";

@Module({
    imports: [\n\t\t${moduleInjection.importsModule.join(",\n\t\t")}\n\t],
    exports: [\n\t\t${moduleInjection.exports.join(",\n\t\t")}\n\t],
    controllers: [\n\t\t${moduleInjection.controllers.join(",\n\t\t")}\n\t],
    providers: [\n\t\t${moduleInjection.providers.join(",\n\t\t")}\n\t]
})
export class LazyModule {}`;
        }

        return result;
    }

    async loadDependencies(items, namespace, stateId){
        let imports = [];
        let dependencies = [];

        for(let itemKey in items){
            const item = items[itemKey];

            if(!imports.includes(item.namespace) && item.namespace != "OutputBlueprint") {
                const importModule = item.filename.replace(`${process.cwd()}/`, "").replace(".ts", "");
                const builderModule = importModule.replace(".blueprint", ".builder");               

                if(fs.existsSync(path.resolve(`${builderModule}.ts`))){
                    try{
                        const builder = require(path.resolve(`${builderModule}.ts`)).default;
                        const moduleData = await builder(item, `${this.uppercaseFirstLetter(namespace)}Blueprint`, itemKey, null, stateId);
                        
                        if(typeof moduleData == "object")
                            dependencies.push(moduleData)
                    }
                    catch(e){
                        console.log(e)
                    }
                }
            }
        }

        return dependencies;
    }
}
