import { Component } from "../Types/Component.type";
import { Color } from "../Types/Color.type";

export class Font extends Component {
    protected override __namespace = "Font";
    protected override __fixed = true;
    protected override __importable = false;
    protected override __icon = "fa-solid fa-font";

    private __style = ["normal", "italic", "oblique", "initial", "inherit"];
    private __variant = ["normal", "small-caps", "initial", "inherit"];
    
    public _font: string = "Arial, sans-serif";
    private _fontChangeStyle = { style: "font-family", styleVue: "fontFamily" };

    public _size: number = 12;
    private _sizeChangeStyle = { style: "font-size", styleVue: "fontSize", subfix: "px" };

    public _color: Color = { r: 0, g: 0, b: 0, a: 1, hex: "#000000" };
    private _colorChangeStyle = { style: "color", styleVue: "color" };

    public _style: string;
    private _styleChangeStyle = { style: "font-style", styleVue: "fontStyle" };

    public _variant: string;
    private _variantChangeStyle = { style: "font-variant", styleVue: "fontVariant" };

    public _variantCaps: string;
    private _variantCapsChangeStyle = { style: "font-variant-caps", styleVue: "font-variant-caps" };

    public _weight: string;
    private _weightChangeStyle = { style: "font-weight", styleVue: "fontWeight" };
}