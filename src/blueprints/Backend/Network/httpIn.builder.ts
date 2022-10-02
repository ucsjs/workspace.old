exports.default = async ($metadata, $blueprint, $itemKey, $moduleInjection, $stateId, $context, $connections) => {
    let $module = "";
    let $controller = "";
    let $routeKey = "";
    let $routes = [];

    for(let publicVar of $metadata.publicVars){
        try{
            switch(publicVar.name){
                case "controller":
                    $controller = publicVar.value || publicVar.default;
                break;
                case "routes":
                    $routeKey = publicVar.name;

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

        $module += `
@Controller("${$controller}")
export class ${$blueprint}Controller {

    constructor(){}\n`;

        for(let route of $routes){
            const method = (route.method) ? route.method : "GET";
            const methodNest = method.charAt(0).toUpperCase() + method.slice(1).toLowerCase();
            let inputRef = (route.key) ? route.key : `${method}-${route.url.replace(/\//img,'-')}`;
            
            if(inputRef.includes(`-${$itemKey}-`))
                inputRef = inputRef.replace(/-.*?-/img, `-${$routeKey}-`);

            let $output = null;

            for(let connection of $connections){
                if(
                    connection.to.component == "HTTPOutBlueprint" && 
                    connection.from.componentKey == $metadata.componentKey && 
                    route.key.replace(/-.*?-/, '-routes-') == connection.from.input
                ){
                    $output = connection.to;
                } 
            }

            $module += `\n    @${methodNest}("${route.url}")
    async ${$blueprint.toLowerCase()}${method.toLowerCase()}${route.url.replace(/\//img, "_").replace(/:/img, "")}(@Req() req: Request, @Res() res: Response){
        const { flow } = await new ${$blueprint}().exec({${$paramsInjection.join(", ")}});`;

            if($output){
                const [input, keyComponent] = $output.input.split("-");
                const componentKey = ($output.componentKey) ? $output.componentKey : `${$output.component.toLowerCase()}${keyComponent}`;
                $module +=`\n\t\tflow.get("${componentKey}").subscribe("output", (data) => { 
            if(data){
                flow.get("${componentKey}")?.unsubscribe("output");
                res.status(200).send(data); 
            }
        });\n`
            }
        
            const componentKey = ($metadata.componentKey) ? $metadata.componentKey : `${$metadata.namespace.toLowerCase()}${$itemKey}`;
            $module += `\n\t\tflow.get("${componentKey}").next("${inputRef.replace(/-.*?-/, '-routes-')}", req);
    }\n`;
        }
        
        $module += `}`;

        return {
            extras: [$module],
            imports: [                
                `import { Request, Response } from "express";`,
                `import { Controller, Req, Res, Get, Post, Put, Delete, Patch } from "@nestjs/common";`,
            ],
            controllers: [`${$blueprint}Controller`]
        };
    }   
    else{
        return null;
    }
};