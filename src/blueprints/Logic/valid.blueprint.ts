import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";

export class ValidBlueprint extends Blueprint {
    //Metadata
    private __namespace = "Valid";
    private __group = "Logic";
    private __headerColor = "#4c4c4c";
    private __headerIcon = "fa-solid fa-check";

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.input("input", Type.Any, null, (b) => {
            if(b && b !== null && b !== undefined) this.next("true", true);
            else this.next("false", true);
        });

        this.output("true", Type.Any, null);
        this.output("false", Type.Any, null);
    }
}