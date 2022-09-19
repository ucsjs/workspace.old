import { VisualObject } from "../Core/VisualObject.component";
import { Dimensions } from "../Core/Dimensions.component";

export class Box extends VisualObject{
    //Matadata
    protected override __namespace = "Box";
    protected override __resizable = true;
    protected override __moveble = true;
    protected override __importable = true;
    protected override __group = "Core";
    protected override __icon = "fa-regular fa-square-full";
   
    constructor($argv){
        super($argv);
    }
}