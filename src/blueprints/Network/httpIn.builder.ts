exports.default = async ($metadata, $blueprint, $itemKey, $moduleInjection) => {
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
        let $paramsInjection = [];
        $module += `\n@Controller("${$controller}")
export class ${$blueprint}Controller {
    constructor(`;

        if($moduleInjection && $moduleInjection.constructors){
            for(let injectContructor of $moduleInjection.constructors){
                for(let item of injectContructor){
                    if(item.includeInConstructor)
                        $module += `\n\t\t${item.includeInConstructor},\n`;

                    if(item.injection)
                        $paramsInjection.push(item.injection)
                }
            }
        }

        $module += `\t){}\n`;

        for(let route of $routes){
            const method = (route.method) ? route.method : "GET";
            const methodNest = method.charAt(0).toUpperCase() + method.slice(1).toLowerCase();
            const inputRef = (route.key) ? route.key : `${method}-${route.url.replace(/\//img,'-')}`;

            $module += `\n    @${methodNest}("${route.url}")
    async ${$blueprint.toLowerCase()}${method.toLowerCase()}${route.url.replace(/\//, "_").replace(/:/img, "")}(@Req() req: Request, @Res() res: Response){
        const { subject, flow } = new ${$blueprint}({${$paramsInjection.join(", ")}}).exec();
        subject.subscribe((data) => { res.status(200).send(data); });
        flow.get("${$metadata.namespace.toLowerCase()}${$itemKey}").next("${inputRef}", req);
    }\n`;
        }
        
        $module += `}`;

        return {
            extras: [$module],
            imports: [
                `import { Controller, Req, Res, Get, Post, Put, Delete, Patch } from "@nestjs/common";`,
                `import { Request, Response } from "express";`
            ],
            controllers: [`${$blueprint}Controller`]
        };
    }   
    else{
        return null;
    }
};