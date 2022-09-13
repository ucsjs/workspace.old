import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";

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
        this.output("payload", Type.Any, null);
    }
}