import { Component } from "../../Types/Component.type";
import { Color } from "../../Types/Color.type";

export class Font extends Component {
    protected override __namespace = "Font";
    protected override __fixed = true;
    protected override __importable = false;
    protected override __icon = "fa-solid fa-font";

    private __style = ["normal", "italic", "oblique", "initial", "inherit"];
    private __variant = ["normal", "small-caps", "initial", "inherit"];
    
    public _font: string = "Arial, sans-serif";
    private __fontHelp = "https://www.w3schools.com/css/css_font.asp";
    private _fontChangeStyle = { style: "font-family", styleVue: "fontFamily" };

    public _size: number = 12;
    private __sizeHelp = "https://www.w3schools.com/css/css_font_size.asp";
    private _sizeChangeStyle = { style: "font-size", styleVue: "fontSize", subfix: "px" };

    public _color: Color = { r: 0, g: 0, b: 0, a: 1, hex: "#000000" };
    private __colorHelp = "https://www.w3schools.com/css/css_text.asp";
    private _colorChangeStyle = { style: "color", styleVue: "color" };

    public _style: string;
    private __styleHelp = "https://www.w3schools.com/css/css_font_style.asp";
    private _styleChangeStyle = { style: "font-style", styleVue: "fontStyle" };

    public _variant: string;
    private __variantHelp = "https://www.w3schools.com/cssref/pr_font_font-variant.asp";
    private _variantChangeStyle = { style: "font-variant", styleVue: "fontVariant" };

    public _variantCaps: string;
    private __variantCapsHelp = "https://www.w3schools.com/cssref/css3_pr_font-variant-caps.asp";
    private _variantCapsChangeStyle = { style: "font-variant-caps", styleVue: "font-variant-caps" };

    public _weight: string;
    private __weightHelp = "https://www.w3schools.com/cssref/pr_font_weight.asp";
    private _weightChangeStyle = { style: "font-weight", styleVue: "fontWeight" };

    public _shadow: object = { h: "number", v: "number", blur: "number", color: "Color", multi: true, formater: "shadowFormater", defaults: "shadowDefaultItem" };
    private __shadowHelp = "https://www.w3schools.com/cssref/css3_pr_text-shadow.asp";
    private _shadowChangeStyle = { style: "text-shadow", styleVue: "text-shadow" };
    private __shadowFormater = "{h}px {v}px {{?blur}}{blur}px{{/blur}} {{?color}}{color.hex}{{/color}}";
    private __shadowDefaultItem: object = { h: 0, v: 0, blur: 0, color: { r: 0, g: 0, b: 0, a: 1, hex: "#000000" } };
}