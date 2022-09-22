import { Body, Controller, Get, Post, Put, Query, Res, StreamableFile } from '@nestjs/common';
import { VisualService } from 'src/services/visual.service';

@Controller("visual")
export class VisualController {
	constructor(private readonly visualService: VisualService) {}

	@Get()
	async index() {
		return await this.visualService.getComponents([
			'./packages/**/*.ts',
			'./src/visualobjects/**/*.ts',
			'./.metadata/visualobjects/**/*.ts'
		], [
			'./packages/**/*.type.ts',
			'./src/visualobjects/**/*.type.ts',
			'./.metadata/visualobjects/**/*.type.ts'
		]);
	}

	@Get("subcomponents")
	async getSubcomponents() {
		return await this.visualService.getSubcomponents([
			'./src/visualobjects/**/*.component.ts',
			'./src/workspace/**/*.ts',
		], [	
			'./src/visualobjects/**/*.type.ts',
			'./src/workspace/**/*.type.ts'
		]);
	}
}
