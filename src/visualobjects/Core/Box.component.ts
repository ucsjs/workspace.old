import { VisualObject } from "./VisualObject.component";
import { Dimensions } from "./Dimensions.component";

export class Box extends VisualObject{
    //Matadata
    protected override __namespace = "Box";
    protected override __resizable = true;
    protected override __moveble = true;
    protected override __importable = true;
    protected override __group = "Core";
    protected override __icon = "fa-regular fa-square-full";

    public _dimensions: Dimensions;
    
    constructor($argv){
        super($argv);
    }
}