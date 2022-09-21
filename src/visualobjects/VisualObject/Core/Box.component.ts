import { VisualObject } from "../../Core/VisualObject.component";
import { Background } from "../../Core/Background.component";

export class Box extends VisualObject {
    //Matadata
    protected override __namespace = "Box";
    protected override __resizable = true;
    protected override __moveble = true;
    protected override __group = "Core";
    protected override __icon = "fa-regular fa-square-full";

    public _background: Background;
   
    constructor($argv){
        super($argv);
    }

    public content(){
        return "<div><slot/></div>";
    }
}