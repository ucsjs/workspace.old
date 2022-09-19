import { Component } from "../Types/Component.type";
import { Color } from "../Types/Color.type";

export class Font extends Component{
    protected override __namespace = "Font";
    protected override __fixed = true;
    protected override __importable = false;
    protected override __icon = "fa-solid fa-font";

    private __font = [];
    
    public _font: string = "Arial, sans-serif";
    public _size: number = 12;
    public _color: Color = { r: 0, g: 0, b: 0, a: 1, hex: "#FFFFFF" };
}