import { Body, Controller, Get, Put, Query, Res, StreamableFile } from '@nestjs/common';
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

	@Put("save")
	async save(@Body() body){
		return await this.fileService.saveFile(body);
	}
}
