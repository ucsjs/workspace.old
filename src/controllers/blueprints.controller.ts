import { Body, Controller, Get } from '@nestjs/common';
import { BlueprintsService } from 'src/services/blueprints.service';

@Controller("blueprints")
export class BlueprintsController {
	constructor(private readonly blueprintsService: BlueprintsService) {}

	@Get("backend")
	async getBackendprints() {
		return await this.blueprintsService.getBlueprints([
			'./packages/**/*.blueprint.ts',
			'./src/blueprints/**/*.blueprint.ts',
			'./.metadata/blueprints/**/*.blueprint.ts',
			'./src/workspace/blueprints/**/*.blueprint.ts'
		]);
	}

	@Get("frontend")
	async getFrontendBlueprints() {
		return await this.blueprintsService.getBlueprints([
			'./**/*.blueprint.client.ts'
		]);
	}
}
