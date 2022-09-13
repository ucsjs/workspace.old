import { Blueprint } from "@ucsjs/blueprint";
import { HTTPTypes } from "./httpTypes.enum";

export class HTTPInBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP In";
    private __type = "Network";
    private __model = "./models/httpin.model.ejs";
    private __module = true;
    private __method = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    
    public _controller: string = "/";  
    public _routes: object = {url: "string", method: "string", multi: true}; 

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.output("payload", HTTPTypes.Request, null);

        if(Array.isArray(metadata.routes)){
            for(let route of metadata.routes){
                const method = (route.method) ? route.method : "GET";
                this.output(`${method}-${metadata.url.replace(/\//img,'-')}`, HTTPTypes.Request, null);
            }
        }
    }

    public moduleData(){
        return {
            
        }
    }
}