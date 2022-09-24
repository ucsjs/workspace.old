import { Controller, Get, Res } from '@nestjs/common';

@Controller("")
export class IndexController {
	@Get()
	async index(@Res() res) {
		return res.render('index');
	}
}
