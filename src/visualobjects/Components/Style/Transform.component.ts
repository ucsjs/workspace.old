import { Component } from "../../Types/Component.type";
import { Range } from "../../Types/Range.type";

export class Transform extends Component {
    protected override __namespace = "Transform";
    protected override __fixed = true;
    protected override __importable = false;
    protected override __icon = "fa-solid fa-maximize";

    private __position = ["absolute", "relative", "fixed", "static", "sticky"];

    public _display: string = "";
    private __displayHelp = "https://www.w3schools.com/cssref/pr_class_display.asp";
    private _displayChangeStyle = { style: "display", styleVue: "display" };
    
    public _position: string = "";
    private __positionHelp = "https://www.w3schools.com/css/css_positioning.asp";
    private _positionChangeStyle = { style: "position", styleVue: "position" };

    public _top: number;
    private __topHelp = "https://www.w3schools.com/cssref/pr_pos_top.asp";
    private _topChangeStyle = { style: "top", styleVue: "top" };

    public _left: number;
    private __leftHelp = "https://www.w3schools.com/cssref/pr_pos_left.asp";
    private _leftChangeStyle = { style: "left", styleVue: "left" };

    public _bottom: number;
    private __bottomHelp = "https://www.w3schools.com/cssref/pr_pos_top.asp";
    private _bottomChangeStyle = { style: "bottom", styleVue: "bottom" };

    public _right: number;
    private __rightHelp = "https://www.w3schools.com/cssref/pr_pos_right.asp";
    private _rightChangeStyle = { style: "right", styleVue: "right" };

    public _zIndex: number;
    private __zIndexHelp = "https://www.w3schools.com/cssref/pr_pos_z-index.asp";
    private _zIndexChangeStyle = { style: "z-index", styleVue: "z-index" };

    public _width: number = 240;
    private __widthHelp = "https://www.w3schools.com/cssref/pr_dim_width.asp";
    private _widthChangeStyle = { style: "width", styleVue: "width" };

    public _height: number = 240;
    private __heightHelp = "https://www.w3schools.com/cssref/pr_dim_height.asp";
    private _heightChangeStyle = { style: "height", styleVue: "height" };

    public _scale: Range = { default: 1, min: -10, max: 10, step: 0.1 };
    public _rotate: Range = { default: 0, min: -360, max: 360, step: 1 };
}