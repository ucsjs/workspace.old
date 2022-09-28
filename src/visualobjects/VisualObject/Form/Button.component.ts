import { BoxVisual } from "../Core/Box.component";
import { Font } from "../../Components/Font.component";
import { Content } from "../../Components/Content.component";
import { Button } from "../../Components/Button.component";

export class ButtonVisual extends BoxVisual {
    //Matadata
    protected override __namespace = "Button";
    protected override __group = "Form";
    protected override __icon = "fa-regular fa-hand-pointer";
    protected override __resizable = true;
    protected override __moveble = true;

    public _font: Font;
    public _content: Content;
    public _button: Button;
    
    constructor($argv){
        super($argv);

        this._transform._width = 150;
        this._transform._height = 40;
        this._border._radiusBottomLeft = 5;
        this._border._radiusBottomRight = 5;
        this._border._radiusTopLeft = 5;
        this._border._radiusTopRight = 5;
        this._background._color = { a: 1, b: 229, g: 70, r: 79, hex: "#4f46e5" };
        this._font._color = { a: 1, b: 255, g: 255, r: 255, hex: "#ffffff" };
        this._content._align = "center";
        this._content._text.content = "Button";
    }

    public content(){
        return "<button :type='component.Button.type' :style='component.style'><font-awesome-icon :icon='component.Button?.icon.icon' v-if='component.Button?.icon.icon' style='margin-right: 5px' />{{ component.Content?.text }}</button>";
    }
}