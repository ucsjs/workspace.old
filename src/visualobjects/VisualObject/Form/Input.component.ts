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
    }

    public content(){
        return "<input :type='component.Input.type' :style='component.style' :value='component.Input.value' />";
    }
}