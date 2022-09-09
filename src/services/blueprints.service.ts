import * as path from "path";
import * as fs from "fs";
import * as fg from "fast-glob";
import * as crypto from "crypto";
import { execSync } from "child_process";
import { Injectable } from '@nestjs/common';

import { RegexService } from "./regex.services";

@Injectable()
export class BlueprintsService {
    constructor(
        private regexService: RegexService
    ){}
    async getBlueprints(paths: Array<string> = []) {
        let blueprints = [];

        for(let pathRelative of paths){
            const fullpath = path.resolve(pathRelative);
            const files = await fg([fullpath], { dot: true, onlyFiles: true });
            
            for(let file of files){
                const contents = fs.readFileSync(file, "utf8").toString();

                if(!fs.existsSync(file.replace(".ts", ".js")))
                    execSync(`./node_modules/.bin/tsc ${file} --module commonjs`);

                const contentsBrowser = fs.readFileSync(file.replace(".ts", ".js"), "utf8").toString();

                if(contents){
                    let blueprint = {
                        filename: file,
                        namespace: this.regexService.getData(/class (.*?) extends Blueprint/isg, contents, ["name"])[0].name,
                        publicVars: this.regexService.getData(/public\s_(.*?)[:]\s(.*?)[\s;][=][\s](.*?)[;]/isg, contents, ["name", "type", "default"]),
                        outputs: this.regexService.getData(/this\.output\(["'](.*?)["'],[\s]Type\.(.*?),.*?\)/isg, contents, ["name", "type"]),
                        inputs: this.regexService.getData(/this\.input\(["'](.*?)["'],[\s]Type\.(.*?),.*?\)/isg, contents, ["name", "type"]),
                        metadata: {},
                        contents: contentsBrowser
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
                    let metadata = {};

                    for(let meta of rawMetadata)
                        metadata[meta.name] = meta.value;
                    
                    blueprint.metadata = metadata;
                    blueprints.push(blueprint);
                }
            }
        }

        return blueprints;
    }
}
