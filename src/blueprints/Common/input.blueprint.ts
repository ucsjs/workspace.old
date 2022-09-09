import { BehaviorSubject } from 'rxjs';
import { Blueprint, Type } from "@ucsjs/blueprint";

export class InputBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Input";
    private __type = "Common";

    public _type: Type = Type.Any;
    public _value: any = null;

    private _state: BehaviorSubject<number>;

    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this._state = new BehaviorSubject(this._value);
        this.output("state", Type.Any, this._state);
    }
}