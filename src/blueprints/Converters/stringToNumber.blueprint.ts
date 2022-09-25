import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";

export class StringToNumberBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Str To Int";
    private __group = "Converters";

    constructor(){
        super();
        this.input("number", Type.String, null, (v) => this.parse(v, this));
        this.output("result", Type.Float, null);
    }

    parse(v, scope){        
        if(typeof v == "string" && !isNaN(parseFloat(v)))
            scope.next("result", parseFloat(v));
        else
            scope.error("result", "Invalid string");
    }
}