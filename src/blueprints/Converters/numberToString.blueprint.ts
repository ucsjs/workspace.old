import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";

export class NumberToStringBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Int To Str";
    private __group = "Converters";

    constructor(){
        super();
        this.input("number", Type.Int, null, (v) => this.parse(v, this));
        this.output("result", Type.String, null);
    }

    parse(v, scope){        
        if(typeof v == "number")
            scope.next("result", v.toString());
        else
            scope.error("result", "Invalid number");
    }
}