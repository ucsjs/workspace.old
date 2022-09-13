import * as path from "path";
import * as fs from "fs";
import * as fg from "fast-glob";
import * as crypto from "crypto";
import { Injectable } from '@nestjs/common';

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
                    outputs: this.regexService.getData(/this\.output\(["'](.*?)["'],[\s]Type.*?\.(.*?),.*?\)/isg, contents, ["name", "type"]),
                    inputs: this.regexService.getData(/this\.input\(["'](.*?)["'],[\s]Type.*?\.(.*?),.*?\)/isg, contents, ["name", "type"]),
                    metadata: {}
                };

                for(let key in blueprint.outputs){
                    blueprint.outputs[key].namespace = `${blueprint.namespace}::${blueprint.outputs[key].name}`;
                    blueprint.outputs[key].id = crypto
                    .createHash("sha1")
                    .update(Buffer.from(blueprint.outputs[key].namespace))
                    .digest("hex")
                }

                for(let key in blueprint.inputs){
                    blueprint.inputs[key].namespace = `${blueprint.namespace}::${blueprint.inputs[key].name}`;
                    blueprint.inputs[key].id = crypto
                    .createHash("sha1")
                    .update(Buffer.from(blueprint.inputs[key].namespace))
                    .digest("hex")
                }

                for(let key in blueprint.publicVars){
                    blueprint.publicVars[key].namespace = `${blueprint.namespace}::${blueprint.publicVars[key].name}`;
                    blueprint.publicVars[key].id = crypto
                    .createHash("sha1")
                    .update(Buffer.from(blueprint.publicVars[key].namespace))
                    .digest("hex")
                }

                const rawMetadata = this.regexService.getData(/private\s__(.*?)[\s]=[\s]["'](.*?)["'];/isg, contents, ["name", "value"]);
                const rawMetadataList = this.regexService.getData(/private\s__(.*?)[\s]=[\s]\[(.*?)\][;]/isg, contents, ["name", "value"], true);
                const rawMetadataBool = this.regexService.getData(/private\s__(.*?)[\s]=[\s](.*?);/isg, contents, ["name", "value"], true);
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
                
                blueprint.metadata = metadata;
                
                blueprint.sign = crypto.createHash("sha1")
                .update(Buffer.from(JSON.stringify(blueprint)))
                .digest("hex");

                blueprints.push(blueprint);
            }
        }
        

        return blueprints;
    }
}
