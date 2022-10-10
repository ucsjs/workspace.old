import { BoxVisual } from "../HTML/Box.component";
import { Font } from "../../Components/Style/Font.component";
import { Input } from "../../Components/Form/Input.component";

export class InputVisual extends BoxVisual {
    //Matadata
    protected override __namespace = "Input";
    protected override __group = "Form";
    protected override __icon = "fa-solid fa-i-cursor";
    protected override __resizable = true;
    protected override __moveble = true;

    public _font: Font;
    public _input: Input;
    
    constructor($argv){
        super($argv);

        this._transform._position = "absolute";
        this._transform._width = 240;
        this._transform._height = 40;

        this._border._borderWidthBottom = 1;
        this._border._borderWidthLeft = 1;
        this._border._borderWidthRight = 1;
        this._border._borderWidthTop = 1;
        this._border._borderColorBottom = { a: 1, b: 229, g: 70, r: 79, hex: "#171717" };
        this._border._borderColorLeft = { a: 1, b: 229, g: 70, r: 79, hex: "#171717" };
        this._border._borderColorRight = { a: 1, b: 229, g: 70, r: 79, hex: "#171717" };
        this._border._borderColorTop = { a: 1, b: 229, g: 70, r: 79, hex: "#171717" };
        this._border._radiusBottomLeft = 5;
        this._border._radiusBottomRight = 5;
        this._border._radiusTopLeft = 5;
        this._border._radiusTopRight = 5;
        this._margin._paddingBottom = 5;
        this._margin._paddingTop = 5;
        this._margin._paddingLeft = 5;
        this._margin._paddingRight = 5;
        this._background._color = { a: 1, b: 229, g: 70, r: 79, hex: "#FFFFFF" };
        this._font._color = { a: 1, b: 255, g: 255, r: 255, hex: "#171717" };
    }

    public content(){
        return `<input 
            class='cursor-default' 
            :type='component.Input.type' 
            :style='component.style' 
            :value='component.Input.value' 
        />`;
    }
}