import { Blueprint, Type } from "@ucsjs/blueprint";
import { HTTPTypes } from "./httpTypes.enum";

export class HTTPHeaderBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP Header";
    private __group = "Network";
    private __headerIcon = "fa-solid fa-table-list";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers";
    private __HTTPTypes_Request: object = { color: "yellow" };

    public _name: string = "";
    public _toJSON: boolean = false;
 
    constructor(metadata?: any){
        super();
        
        this.setup(metadata);

        this.input("request", HTTPTypes.Request, null).subscribe((request) => {
            if(request){
                if(request.params.hasOwnProperty(this._name)){
                    if(this._toJSON){
                        const json = {};
                        json[this._name] = request.headers[this._name];
                        this.next("result", json);
                    }
                    else{
                        this.next("result", request.headers[this._name]);
                    }
                }
            }
        });

        this.output("result", Type.Any, null);
    }
}