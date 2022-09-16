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

            if(component)
                components.push(component);
        }

        return components;
    }

    uppercaseFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}
