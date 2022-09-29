import { VisualObject } from "../../Components/VisualObject.component";
import { Border } from "../../Components/Border.component";
import { Background } from "../../Components/Background.component";

export class BoxVisual extends VisualObject {
    //Matadata
    protected override __namespace = "Box";
    protected override __resizable = true;
    protected override __moveble = true;
    protected override __group = "Core";
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