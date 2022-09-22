import { Component } from "../Types/Component.type";
import { BigText } from "../Interfaces/BigText.interface";
import { Color } from "../Types/Color.type";

export class Content extends Component {
    protected override __namespace = "Content";
    protected override __icon = "fa-solid fa-align-justify";
    protected override __fixed = true;
    protected override __importable = false;

    private __align = ["left", "right", "center", "justify", "initial", "inherit"];
    private __alignLast = ["auto", "left", "right", "center", "justify", "start", "end", "initial", "inherit"];
    private __decorationLine = ["none", "underline", "overline", "line-through", "initial", "inherit"];
    
    public _align: string = "left";
    private _alignChangeStyle = { style: "text-align", styleVue: "textAlign" };

    public _alignLast: string = "";
    private _alignLastChangeStyle = { style: "text-align-last", styleVue: "text-align-last" };

    public _decorationColor: Color;
    private _decorationColorChangeStyle = { style: "text-decoration-color", styleVue: "text-decoration-color" };

    public _decorationLine: string = "";
    private _decorationLineChangeStyle = { style: "text-decoration-line", styleVue: "text-decoration-line" };

    public _content: BigText;

}