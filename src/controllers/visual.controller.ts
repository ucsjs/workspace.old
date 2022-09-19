import { Body, Controller, Get, Post, Put, Query, Res, StreamableFile } from '@nestjs/common';
import { VisualService } from 'src/services/visual.service';

@Controller("visual")
export class VisualController {
	constructor(private readonly visualService: VisualService) {}

	@Get()
	async index() {
		return await this.visualService.getComponents([
			'./packages/**/*.component.ts',
			'./src/visualobjects/**/*.component.ts',
			'./.metadata/visualobjects/**/*.component.ts'
		]);
	}

	@Get("subcomponents")
	async getSubcomponents() {
		return await this.visualService.getSubcomponents([
			'./src/workspace/**/*.ts',
		]);
	}
}
