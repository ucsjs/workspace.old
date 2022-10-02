import { Logger } from '@nestjs/common';
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
            if(b !== undefined && b !== null && typeof b === "boolean"){
                Logger.log(`Recive condition: ${b}`, "IfElseBlueprint");
                
                if(b === true) {
                    this.next("true", true);
                    this.trigger("true");
                }
                else if(b === false){
                    this.next("false", false);
                    this.trigger("false");
                }
            }
        });

        this.event("true");
        this.event("false");
        this.output("true", Type.Any, null);
        this.output("false", Type.Any, null);
    }
}