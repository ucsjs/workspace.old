import { Font } from "../../Components/Style/Font.component";
import { Content } from "../../Components/HTML/Content.component";
import { Animation } from "../../Components/Scripts/Animation.component";
import { BoxVisual } from "../HTML/Box.component";

export class NotificationVisual extends BoxVisual {
    //Matadata
    protected override __namespace = "Notification";
    protected override __group = "UI";
    protected override __icon = "fa-solid fa-circle-exclamation";
    protected override __resizable = true;
    protected override __moveble = true;

    public _font: Font;
    public _content: Content;
    public _animation: Animation;
    
    constructor($argv){
        super($argv);

        this._transform._position = "absolute";
        this._transform._width = 240;
        this._transform._height = 40;
        this._border._borderWidthBottom = 1;
        this._border._borderWidthLeft = 1;
        this._border._borderWidthRight = 1;
        this._border._borderWidthTop = 1;
        this._border._borderColorBottom = { a: 1, b: 229, g: 70, r: 79, hex: "#CCCCCC" };
        this._border._borderColorLeft = { a: 1, b: 229, g: 70, r: 79, hex: "#CCCCCC" };
        this._border._borderColorRight = { a: 1, b: 229, g: 70, r: 79, hex: "#CCCCCC" };
        this._border._borderColorTop = { a: 1, b: 229, g: 70, r: 79, hex: "#CCCCCC" };
        this._border._radiusBottomLeft = 5;
        this._border._radiusBottomRight = 5;
        this._border._radiusTopLeft = 5;
        this._border._radiusTopRight = 5;
        this._background._color = { a: 1, b: 229, g: 70, r: 79, hex: "#FFFFFF" };
        this._font._color = { a: 1, b: 255, g: 255, r: 255, hex: "#000000" };
        this._content._align = "center";
        this._content._text = { content: "Text..." };
    }

    public content(){
        return "<div :style='component.style'>{{ component.Content.text?.content }}</div>";
    }
}