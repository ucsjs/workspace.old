import { VisualObject } from "../../Components/Core/VisualObject.component";
import { Border } from "../../Components/Style/Border.component";
import { Background } from "../../Components/Style/Background.component";

export class BoxVisual extends VisualObject {
    //Matadata
    protected override __namespace = "Div";
    protected override __resizable = true;
    protected override __moveble = true;
    protected override __group = "HTML";
    protected override __icon = "fa-regular fa-square-full";

    public _border: Border;
    public _background: Background;
   
    constructor($argv){
        super($argv);

        this._transform._position = "absolute";
    }

    public content(){
        return `<div><slot></slot></div>`;
    }
}