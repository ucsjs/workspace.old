import { Blueprint } from "@ucsjs/blueprint";
import { HTTPTypes } from "./httpTypes.enum";

export class HTTPInBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP In";
    private __group = "Network";
    private __model = "./models/httpin.model.ejs";
    private __headerIcon = "fa-solid fa-turn-down";
    private __method = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    private __HTTPTypes_Request: object = { color: "yellow" };
    
    public _controller: string = "/";  
    public _routes: object = {realType: "HTTPTypes.Request", url: "string", method: "string", auth: "boolean", multi: true, createOutputs: true}; 

    constructor(metadata?: any){
        super();

        this.setup(metadata);
  
        if(Array.isArray(metadata.routes)){
            for(let route of metadata.routes){
                const method = (route.method) ? route.method : "GET";

                if(route.key) {
                    this.output(route.key, HTTPTypes.Request, null);
                    this.output(`${route.key.replace(/-.*?-/, "-routes-")}`, HTTPTypes.Request, null);
                }                       
                else
                    this.output(`${method}-${route.url.replace(/\//img,'-')}`, HTTPTypes.Request, null);
            }
        }
    }
}