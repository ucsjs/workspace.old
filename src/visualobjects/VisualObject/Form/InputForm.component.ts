import { VisualObject } from "../../Core/VisualObject.component";
import { Font } from "../../Core/Font.component";
import { Input } from "../../Core/Input.component";
import { Background } from "../../Core/Background.component";

export class InputForm extends VisualObject {
    //Matadata
    protected override __namespace = "Input";
    protected override __group = "Form";
    protected override __icon = "fa-solid fa-i-cursor";
    protected override __resizable = true;
    protected override __moveble = true;

    public _background: Background;
    public _font: Font;
    public _input: Input;
    
    constructor($argv){
        super($argv);

        this._transform._width = 240;
        this._transform._height = 40;
    }

    public content(){
        return "<input :type='component.Input.type' :style='component.style' :value='component.Input.value' />";
    }
}