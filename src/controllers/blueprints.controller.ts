import { Body, Controller, Get } from '@nestjs/common';
import { BlueprintsService } from 'src/services/blueprints.service';

@Controller("blueprints")
export class BlueprintsController {
	constructor(private readonly blueprintsService: BlueprintsService) {}

	@Get()
	async index() {
		return await this.blueprintsService.getBlueprints([
			'./src/blueprints/**/*.blueprint.ts',
			'./.metadata/blueprints/**/*.blueprint.ts'
		]);
	}
}
