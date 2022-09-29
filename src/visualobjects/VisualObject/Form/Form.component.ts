import { VisualObject } from "../../Components/VisualObject.component";
import { Form } from "../../Components/Form.component";

export class FormVisual extends VisualObject {
    //Matadata
    protected override __namespace = "Form";
    protected override __group = "Form";
    protected override __icon = "fa-solid fa-border-none";
    protected override __resizable = false;
    protected override __moveble = false;
    protected override __removeClass = true;
    protected override __removeTransform = true;
    protected override __static = true;

    private __transform_widthSufix = "%";
    private __transform_heightSufix = "%";

    public _form: Form;
     
    constructor($argv){
        super($argv);

        this._transform._position = "";
        this._transform._width = 100;
        this._transform._height = 100;
        this._transform._left = 0;
        this._transform._top = 0;
    }

    public content(){
        return `<form :type='component.Form.type'>
        <slot></slot>
    </form>`;
    }
}