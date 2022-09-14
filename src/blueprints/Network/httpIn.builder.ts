exports.default = async ($metadata, $blueprint, $itemKey) => {
    let $module = "";
    let $controller = "";
    let $routes = [];

    for(let publicVar of $metadata.publicVars){
        try{
            switch(publicVar.name){
                case "controller":
                    $controller = publicVar.value || publicVar.default;
                break;
                case "routes":
                    for(let route of publicVar.value){
                        $routes.push(route);
                    }   
                break;
            }
        }
        catch(e){}
    }

    if($controller){
        $module += `\nimport { Module, Controller, Req, Res, Get, Post, Put, Delete, Patch } from '@nestjs/common';
import { Request, Response } from "express";

@Controller("${$controller}")
export class ${$blueprint}Controller {
    private ${$blueprint.toLowerCase()}: ${$blueprint};

    constructor(){
        this.${$blueprint.toLowerCase()} = new ${$blueprint}();
    }\n`;

        for(let route of $routes){
            const method = (route.method) ? route.method : "GET";
            const methodNest = method.charAt(0).toUpperCase() + method.slice(1).toLowerCase();
            const inputRef = (route.key) ? route.key : `${method}-${route.url.replace(/\//img,'-')}`;

            $module += `\n    @${methodNest}("${route.url}")
    async ${$blueprint.toLowerCase()}${method.toLowerCase()}${route.url.replace(/\//, "_").replace(/:/img, "")}(@Req() req: Request, @Res() res: Response){
        const { subject, flow } = this.${$blueprint.toLowerCase()}.exec();
        subject.subscribe((data) => { res.status(200).send(data); });
        flow.get("${$metadata.namespace.toLowerCase()}${$itemKey}").next("${inputRef}", req);
    }\n`;
        }

        $module += `}
        
@Module({
    controllers: [${$blueprint}Controller]
})
export class LazyModule {}`;
    }   

    return $module;
};