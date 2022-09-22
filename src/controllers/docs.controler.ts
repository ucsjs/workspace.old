import { Body, Controller, Get, Res } from '@nestjs/common';
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
}
