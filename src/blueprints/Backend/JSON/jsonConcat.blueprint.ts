import { Blueprint, Type } from "@ucsjs/blueprint";

export class JSONConcatBlueprint extends Blueprint{
    //Metadata
    private __namespace = "JSON Concat";
    private __group = "JSON";
    private __headerColor = "#9603c6";
    private __headerIcon = "fa-solid fa-code";

    private state: any = {};

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("JSON1", Type.JSON, null, (v) => this.parse(v, "JSON1", this));
        this.input("JSON2", Type.JSON, null, (v) => this.parse(v, "JSON2", this));
        this.output("result", Type.JSON, null);       
    }

    parse(v, name, scope){
        scope.state[name] = v;
        
        if(scope.state.JSON1 && scope.state.JSON2){
            let result = {};

            if(Array.isArray(scope.state.JSON1) && Array.isArray(scope.state.JSON2)){
                result = scope.state.JSON1.concat(scope.state.JSON2);
            }
            else if(typeof scope.state.JSON1 == "object" && typeof scope.state.JSON2 == "object"){
                result = scope.state.JSON1;

                for(let key in scope.state.JSON2)
                    result[key] = scope.state.JSON2[key];
            }

            scope.next("result", result);
        }
    }
}