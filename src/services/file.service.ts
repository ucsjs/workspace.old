import * as path from "path";
import * as fg from "fast-glob";
import * as fs from "fs";
import * as mime from "mime-types";
import * as crypto from 'crypto';
import * as languageDetect from "language-detect";
import { Injectable } from '@nestjs/common';
import { BlueprintsService } from "./blueprints.service";

@Injectable()
export class FileService {
	constructor(
		private blueprintsService: BlueprintsService
	){}

	async getFiles(pathname: string = "") {
		const resolvePath = (pathname) ? pathname : path.resolve(`./`);
		const directories = await fg([`${resolvePath}/*`], { dot: false, onlyDirectories: true });
		const files = await fg([`${resolvePath}/*`], { dot: true, onlyFiles: true });
		let result = [];

		for(let diretory of directories) {
			const info = fs.lstatSync(diretory);
			
			result.push({
				name: diretory.replace(resolvePath, "").replace(/\//s, ""),
				path: diretory,
				filename: diretory,
				isDirectory: true,
				isFile: false,		
				pathHash: crypto.createHash('sha1').update(diretory).digest('hex'),		
				sha256: crypto.createHash('sha256').update(JSON.stringify(info)).digest('hex'),
				lastModified: info.mtime
			})
		}

		for(let file of files) {
			if(!file.includes(".blueprint.meta") && !file.includes(".page.meta")){
				const info = fs.lstatSync(file);
				const basename = path.basename(file);
				let language = info.isFile() ? languageDetect.filename(file)?.toLowerCase() : null;

				switch(path.extname(file).replace(".", "")){
					case "ts": language = "typescript"; break;
				}

				if(file.includes("blueprint.ts"))
					language = "blueprint";
				else if(file.includes("page.ts"))
					language = "page";

				result.push({
					name: file.replace(resolvePath, "").replace(/\//s, ""),
					path: file,
					filename: file,
					isDirectory: info.isDirectory(),
					isFile: info.isFile(),
					ext: path.extname(file).replace(".", ""),
					mime: mime.lookup(file),				
					sha256: crypto.createHash('sha256').update(JSON.stringify(info)).digest('hex'),
					pathHash: crypto.createHash('sha1').update(file).digest('hex'),
					hasMetadata: fs.existsSync(`${file.replace(basename, `.${basename.replace(".ts", "")}`)}.meta`),
					language,
					lastModified: info.mtime
				});
			}
		}

		return result;
	}

	steamFile(filename: string) {
		const basename = path.basename(filename);

		return (
			filename.includes("blueprint.ts") &&
			fs.existsSync(`${filename.replace(basename, `.${basename.replace(".ts", "")}`)}.meta`)
		) ? fs.createReadStream(`${filename.replace(basename, `.${basename.replace(".ts", "")}`)}.meta`) : fs.createReadStream(filename);
	}

	async createFile(pathname: string, filename: string){
		const filenameFull = path.resolve(`${pathname}/${filename}`);

		if(filenameFull.includes(".blueprint.ts")){
			const dirname = path.dirname(filenameFull);
			const basename = path.basename(filenameFull, ".ts");
			const parserBasename = basename.split(".");
			await fs.writeFileSync(`${dirname}/.${basename}.meta`, "{}");
		}

		await fs.writeFileSync(filenameFull, "");

		const info = fs.lstatSync(filenameFull);

		return {		
			pathHash: crypto.createHash('sha1').update(filenameFull).digest('hex'),		
			sha256: crypto.createHash('sha256').update(JSON.stringify(info)).digest('hex'),
			lastModified: info.mtime
		};
	}

	async saveFile(item){
		if(item.filename.includes(".blueprint.ts")){
			let metadata = null;

			try{
				metadata = JSON.stringify(JSON.parse(item.content), null, 4);
			}
			catch(e){}

			if(metadata){
				const dirname = path.dirname(item.filename);
				const basename = path.basename(item.filename, ".ts");
				const parserBasename = basename.split(".");
				await fs.writeFileSync(`${dirname}/.${basename}.meta`, metadata);
				const contents = await this.blueprintsService.parse(item, parserBasename[0]);
				await fs.writeFileSync(item.filename, contents);
			}
			else{
				await fs.writeFileSync(item.filename, item.content);
			}
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
