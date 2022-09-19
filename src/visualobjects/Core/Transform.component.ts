import { Component } from "../Types/Component.type";
import { Range } from "../Types/Range.type";

export class Transform extends Component{
    protected override __namespace = "Transform";
    protected override __fixed = true;
    protected override __importable = false;
    protected override __icon = "fa-solid fa-maximize";

    private __position = ["absolute", "relative", "fixed", "static", "sticky"];
    
    public _position: string = "absolute";
    public _top: number = 0;
    public _left: number = 0;
    public _scale: Range = { default: 1, min: -10, max: 10, step: 0.1 };
    public _zIndex: number = 1;
}