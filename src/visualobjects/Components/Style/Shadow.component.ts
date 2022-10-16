import { Component } from "../../Types/Component.type";
import { Color } from "../../Types/Color.type";

export class Shadow extends Component {
    protected override __group = "Style";
    protected override __namespace = "Shadow";
    protected override __icon = "fa-solid fa-cloud";
    protected override __fixed = false;
    protected override __importable = true;
    protected override __script = true;
    protected override __formaterStyle = "box-shadow";
    protected override __formater = "{left} {bottom} {blur} {spread} {color} {{?inset}}{inset}{{/inset}}";
    
    public _color: Color;
    public _left: number = 1;
    public _bottom: number = 1;
    public _blur: number = 0;
    public _spread: number = 0;
    public _inset: boolean = false;
}