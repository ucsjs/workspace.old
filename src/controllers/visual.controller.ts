import { Body, Controller, Get, Post, Put, Query, Res, StreamableFile } from '@nestjs/common';
import { DefaultVisualParser } from 'src/parsers/default.visual.parser';

@Controller("visual")
export class VisualController {
	constructor(private readonly visualparser: DefaultVisualParser) {}

	@Get()
	async index() {
		return await this.visualparser.getComponents([
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
		return await this.visualparser.getSubcomponents([
			'./src/visualobjects/**/*.component.ts',
			'./src/workspace/**/*.ts',
		], [	
			'./src/visualobjects/**/*.type.ts',
			'./src/workspace/**/*.type.ts'
		]);
	}

	@Get("frontend")
	async getFrontendBlueprints() {
		return await this.visualparser.getFrontendBlueprints(['./src/**/*.blueprint.meta']);
	}
}
