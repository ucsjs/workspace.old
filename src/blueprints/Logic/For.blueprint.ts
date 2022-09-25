import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";

export class ForBlueprint extends Blueprint {
    //Metadata
    private __namespace = "For";
    private __group = "Logic";
    private __headerColor = "#4c4c4c";
    private __headerIcon = "fa-solid fa-rotate-right";

    public _start: number = 0;
    public _end: number = 0;
    public _increment: number = 1;

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.input("array", Type.Array, null, (v) => {
            if(Array.isArray(v)){
                for(let i = this._start; i < this._end; i += this._increment){
                    this.next("index", i);
                    this.next("item", v[i]);
                }
            }
        });

        this.output("index", Type.Int, null);
        this.output("item", Type.Any, null);
    }
}