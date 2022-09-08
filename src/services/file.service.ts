import * as path from "path";
import * as fg from "fast-glob";
import * as fs from "fs";
import * as mime from "mime-types";
import * as crypto from 'crypto';
import * as languageDetect from "language-detect";
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
	async getFiles(pathname: string = "") {
		const resolvePath = path.resolve(`./.metadata/${pathname}`);
		const files = await fg([`${resolvePath}/*`], { dot: true, onlyFiles: false });
		let result = [];

		for(let file of files) {
			const info = fs.lstatSync(file);
			let language = info.isFile() ? languageDetect.filename(file).toLowerCase() : null;

			switch(path.extname(file).replace(".", "")){
				case "ts": language = "typescript"; break;
			}

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
		return fs.createReadStream(filename);
	}

	async saveFile(item){
		await fs.writeFileSync(item.filename, item.content);
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
