import { ArgumentsHost, Catch, ExceptionFilter, HttpCode, HttpException, Logger } from "@nestjs/common";
import { BlueprintsService } from "src/services/blueprints.service";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	constructor(
		private blueprintsService: BlueprintsService
	){}

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		const status = exception.getStatus();

		/*this.blueprintsService.existsRouter(request).then((res) => {
			response.status(200).json(res);
		}).catch((error) => {
			Logger.error(error);
			
			response.status(404).json({
				statusCode: status,
				timestamp: new Date().toISOString(),
				error
			});
		});*/		
	}
}