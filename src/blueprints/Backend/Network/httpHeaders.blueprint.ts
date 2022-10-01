import { Blueprint, Type } from "@ucsjs/blueprint";
import { HTTPTypes } from "./httpTypes.enum";

export class HTTPHeadersBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP Headers";
    private __group = "Network";
    private __headerIcon = "fa-solid fa-table-list";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers";
    private __HTTPTypes_Request: object = { color: "yellow" };
 
    constructor(metadata?: any){
        super();
        
        this.setup(metadata);

        this.input("request", HTTPTypes.Request, null).subscribe((request) => {
            if(request)
                this.next("result", request.headers);
        });

        this.output("headers", Type.JSON, null);
    }
}