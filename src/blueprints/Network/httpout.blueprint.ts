import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";

export class HTTPOutBlueprint extends Blueprint{
    //Metadata
    private __namespace = "HTTP Out";
    private __type = "Network";

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("contents", Type.Any, null);
    }
}