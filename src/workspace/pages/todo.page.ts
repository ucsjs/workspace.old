import { Module, Controller, Get, Header, StreamableFile } from "@nestjs/common";
import { readFileSync } from 'fs';

@Controller("todo-page")
class TodoPageController {
    @Get()
    @Header('Content-Type', 'text/html')
    async index(){
        return readFileSync('./src/workspace/pages/todo.page.html', "utf8");
    }
}

@Module({
    controllers: [TodoPageController],
})
export class LazyModule {}