import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";

export class IfElseBlueprint extends Blueprint {
    //Metadata
    private __namespace = "IfElse";
    private __group = "Logic";
    private __headerColor = "#4c4c4c";
    private __headerIcon = "fa-solid fa-arrows-split-up-and-left";

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.input("condition", Type.Boolean, null, (b: boolean) => {
            if(b) this.next("true", true);
            else this.next("false", false);
        });

        this.output("true", Type.Any, null);
        this.output("false", Type.Any, null);
    }
}