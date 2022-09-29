import { Component } from "../Types/Component.type";
import { Color } from "../Types/Color.type";
import { ImageType } from "../Types/Image.type";

export class Border extends Component {
    //Matadata
    protected override __namespace = "Border";
    protected override __icon = "fa-solid fa-border-top-left";
    protected override __fixed = true;
    protected override __importable = false;

    //Top
    public _borderStyleTop: string = "";
    private _borderStyleTopChangeStyle = { style: "border-top-style", styleVue: "border-top-style" };

    public _borderWidthTop: number = 0;
    private _borderWidthTopChangeStyle = { style: "border-top-width", styleVue: "border-top-width" };

    public _borderColorTop: Color = { r: 0, g: 0, b: 0, a: 1, hex: "" };
    private _borderColorTopChangeStyle = { style: "border-top-color", styleVue: "border-top-color" };

    //Left
    public _borderStyleLeft: string = "";
    private _borderStyleLeftChangeStyle = { style: "border-left-style", styleVue: "border-left-style" };

    public _borderWidthLeft: number = 0;
    private _borderWidthLeftChangeStyle = { style: "border-left-width", styleVue: "border-left-width" };

    public _borderColorLeft: Color = { r: 0, g: 0, b: 0, a: 1, hex: "" };
    private _borderColorLeftChangeStyle = { style: "border-left-color", styleVue: "border-left-color" };

    //Bottom
    public _borderStyleBottom: string = "";
    private _borderStyleBottomChangeStyle = { style: "border-bottom-style", styleVue: "border-bottom-style" };

    public _borderWidthBottom: number = 0;
    private _borderWidthBottomChangeStyle = { style: "border-bottom-width", styleVue: "border-bottom-width" };

    public _borderColorBottom: Color = { r: 0, g: 0, b: 0, a: 1, hex: "" };
    private _borderColorBottomChangeStyle = { style: "border-bottom-color", styleVue: "border-bottom-color" };

    //Right
    public _borderStyleRight: string = "";
    private _borderStyleRightChangeStyle = { style: "border-right-style", styleVue: "border-right-style" };

    public _borderWidthRight: number = 0;
    private _borderWidthRightChangeStyle = { style: "border-right-width", styleVue: "border-right-width" };

    public _borderColorRight: Color = { r: 0, g: 0, b: 0, a: 1, hex: "" };
    private _borderColorRightChangeStyle = { style: "border-right-color", styleVue: "border-right-color" };

    //Radius
    public _radiusTopLeft: number = 0;
    private _radiusTopLeftChangeStyle = { style: "border-top-left-radius", styleVue: "border-top-left-radius" };

    public _radiusTopRight: number = 0;
    private _radiusTopRightChangeStyle = { style: "border-top-right-radius", styleVue: "border-top-right-radius" };

    public _radiusBottomRight: number = 0;
    private _radiusBottomRightChangeStyle = { style: "border-bottom-right-radius", styleVue: "border-bottom-right-radius" };

    public _radiusBottomLeft: number = 0;
    private _radiusBottomLeftChangeStyle = { style: "border-bottom-left-radius", styleVue: "border-bottom-left-radius" };
}