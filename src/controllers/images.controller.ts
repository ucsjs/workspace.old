import { Body, Controller, Get, Post, Put, Query, Res, StreamableFile } from '@nestjs/common';
import { ImagesService } from 'src/services/images.service';

@Controller("images")
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Get("google")
	async getGoogleImages(@Query("s") s: string) {
		return await this.imagesService.getGoogleImages(s);
	}
}
