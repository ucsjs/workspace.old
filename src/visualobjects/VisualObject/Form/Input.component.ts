import { VisualObject } from "../../Components/VisualObject.component";
import { Font } from "../../Components/Font.component";
import { Input } from "../../Components/Input.component";
import { Background } from "../../Components/Background.component";

export class InputVisual extends VisualObject {
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