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

    public _form: Form;
     
    constructor($argv){
        super($argv);
    }

    public content(){
        return "<form :type='component.Button.type'><slot></slot></form>";
    }
}