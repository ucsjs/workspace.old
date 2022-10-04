import * as fs from "fs";
import { Body, Controller, Get, Post } from '@nestjs/common';
import { DefaultBlueprintParser } from 'src/parsers/default.blueprints.parser';

@Controller("blueprints")
export class BlueprintsController {
	constructor(private readonly defaultBlueprintParser: DefaultBlueprintParser) {}

	@Get("backend")
	async getBackendprints() {
		return await this.defaultBlueprintParser.getBlueprints([
			'./packages/**/*.blueprint.ts',
			'./src/blueprints/**/*.blueprint.ts',
			'./.metadata/blueprints/**/*.blueprint.ts',
			'./src/workspace/**/*.blueprint.ts'
		]);
	}

	@Get("frontend")
	async getFrontendBlueprints() {
		let blueprints = await this.defaultBlueprintParser.getBlueprints(['./**/*.blueprint.client.ts']);

		for(let key in blueprints){
			if(fs.existsSync(blueprints[key].filename?.replace(".blueprint", "").replace(".ts", ".js")))
				blueprints[key].content = await fs.readFileSync(blueprints[key].filename?.replace(".blueprint", "").replace(".ts", ".js"), "utf8");
		}
		
		return blueprints;
	}

	@Get("expression")
	async getExpressionBlueprints() {
		let blueprints = await this.defaultBlueprintParser.getBlueprints(['./**/*.blueprint.exp.ts']);

		for(let key in blueprints){
			if(fs.existsSync(blueprints[key].filename?.replace(".blueprint", "").replace(".ts", ".js")))
				blueprints[key].content = await fs.readFileSync(blueprints[key].filename?.replace(".blueprint", "").replace(".ts", ".js"), "utf8");
		}
		
		return blueprints;
	}

	@Post("expression")
	async debugExpressionBlueprints(@Body() body: any) {
		return await this.defaultBlueprintParser.debugExpressionBlueprints(body);
	}
}
