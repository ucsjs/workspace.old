import * as path from "path";
import * as fg from "fast-glob";
import * as fs from "fs";
import * as mime from "mime-types";
import * as crypto from 'crypto';
import * as languageDetect from "language-detect";
import { Injectable } from '@nestjs/common';
import { Parser } from "@ucsjs/blueprint";

@Injectable()
export class FileService {
	async getFiles(pathname: string = "") {
		const resolvePath = path.resolve(`./.workspace/${pathname}`);
		const files = await fg([`${resolvePath}/*`], { dot: false, onlyFiles: false });
		let result = [];

		for(let file of files) {
			const info = fs.lstatSync(file);
			let language = info.isFile() ? languageDetect.filename(file)?.toLowerCase() : null;

			switch(path.extname(file).replace(".", "")){
				case "ts": language = "typescript"; break;
			}

			if(file.includes("blueprint.ts"))
				language = "blueprint";

			result.push({
				name: file.replace(resolvePath, "").replace(/\//s, ""),
				path: file.replace(resolvePath, ""),
				filename: file,
				isDirectory: info.isDirectory(),
				isFile: info.isFile(),
				ext: path.extname(file).replace(".", ""),
				mime: mime.lookup(file),				
				sha256: crypto.createHash('sha256').update(JSON.stringify(info)).digest('hex'),
				language,
				lastModified: info.mtime
			})
		}

		return result;
	}

	steamFile(filename: string) {
		const basename = path.basename(filename);
		return (filename.includes("blueprint.ts")) ? fs.createReadStream(`${filename.replace(basename, `.${basename.replace(".ts", "")}`)}.meta`) : fs.createReadStream(filename);
	}

	uppercaseFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	async saveFile(item){
		if(item.filename.includes(".blueprint.ts")){
			const dirname = path.dirname(item.filename);
			const basename = path.basename(item.filename, ".ts");
			const parserBasename = basename.split(".");
			await fs.writeFileSync(`${dirname}/.${basename}.meta`, item.content);
			
			const parser = new Parser(`${this.uppercaseFirstLetter(parserBasename[0])}Blueprint`, JSON.parse(item.content), [
				path.resolve("./src/blueprints/**/*.blueprint.ts")
			], path.resolve("."));
		
			fs.writeFileSync(item.filename, await parser.export());
		}
		else{
			await fs.writeFileSync(item.filename, item.content);
		}

		const info = fs.lstatSync(item.filename);

		return {				
			sha256: crypto.createHash('sha256').update(JSON.stringify(info)).digest('hex'),
			lastModified: info.mtime
		};
	}

	checksum(filename: string){
		const info = fs.lstatSync(filename);
		return crypto.createHash('sha256').update(JSON.stringify(info)).digest('hex')
	}
}
