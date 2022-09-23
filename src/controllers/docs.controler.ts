import * as path from "path";
import { Body, Controller, Get, Param, Res } from '@nestjs/common';
import { DocsService } from 'src/services/docs.service';

@Controller("docs")
export class DocsController {
    constructor(
        private docsService: DocsService
    ){}

	@Get()
	async index(@Res() res) {
		return res.render('docs/index', await this.docsService.getDocsStrutucture());
	}

	@Get("/:item")
	async getDoc(@Param("item") item: string, @Res() res) {
		const file = path.resolve("./docs/" + item);
		return res.render('docs/index', await this.docsService.getDocsStrutucture(file));
	}
}
