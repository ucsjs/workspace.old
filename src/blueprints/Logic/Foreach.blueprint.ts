import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";

export class ForeachBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Foreach";
    private __group = "Logic";
    private __headerColor = "#4c4c4c";
    private __headerIcon = "fa-solid fa-arrows-rotate";

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.input("array", Type.Any, null, (v) => {
            if(Array.isArray(v) || typeof v == "object"){
                for(let key in v){
                    this.next("index", key);
                    this.next("item", v[key]);
                }
            }
        });

        this.output("index", Type.Any, null);
        this.output("item", Type.Any, null);
    }
}