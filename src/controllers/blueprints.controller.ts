import * as fs from "fs";
import { Controller, Get } from '@nestjs/common';
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
		let blueprints = await this.blueprintsService.getBlueprints(['./**/*.blueprint.client.ts']);

		for(let key in blueprints){
			if(fs.existsSync(blueprints[key].filename?.replace(".blueprint", "").replace(".ts", ".js")))
				blueprints[key].content = await fs.readFileSync(blueprints[key].filename?.replace(".blueprint", "").replace(".ts", ".js"), "utf8");
		}
		
		return blueprints;
	}
}
