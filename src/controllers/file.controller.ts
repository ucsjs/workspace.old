import { Body, Controller, Get, Post, Put, Query, Res, StreamableFile } from '@nestjs/common';
import { FileService } from 'src/services/file.service';

@Controller("files")
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Get()
	async index(@Query("path") path: string) {
		return await this.fileService.getFiles(path);
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

	@Put("save")
	async save(@Body() body){
		return await this.fileService.saveFile(body);
	}
}
