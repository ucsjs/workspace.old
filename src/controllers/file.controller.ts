import { Body, Controller, Delete, Get, Post, Put, Query, Res, StreamableFile } from '@nestjs/common';
import { FileService } from 'src/services/file.service';

@Controller("files")
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Get()
	async index(@Query("path") path: string, @Query("onlyDir") onlyDir: boolean, @Query("onlyFiles") onlyFiles: boolean) {
		return await this.fileService.getFiles(path, onlyDir, onlyFiles);
	}

	@Delete()
	async deleteFile(@Query("filename") filename: string){
		return await this.fileService.deleteFile(filename);
	}

	@Get("open")
	async openFile(@Query("filename") filename: string){
		return await this.fileService.openFile(filename);
	}

	@Get("stream")
	async stream(@Query("filename") filename: string) {
		const file = this.fileService.steamFile(filename);
		return new StreamableFile(file);
	}

	@Post("create")
	async create(@Query("path") path: string, @Query("filename") filename: string){
		return await this.fileService.createFile(path, filename);
	}

	@Post("dir")
	async createDir(@Query("path") path: string, @Query("name") name: string){
		return await this.fileService.createDir(path, name);
	}

	@Delete("dir")
	async deleteDir(@Query("dirname") dirname: string){
		return await this.fileService.deleteDir(dirname);
	}

	@Put("save")
	async save(@Body() body){
		if(process.env.ALLOW_SAVEFILE !== "false")
			return await this.fileService.saveFile(body);
		else
			return false;
	}
}
