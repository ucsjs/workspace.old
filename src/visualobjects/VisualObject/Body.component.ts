import { VisualObject } from "../Components/VisualObject.component";
import { Border } from "../Components/Border.component";
import { Background } from "../Components/Background.component";

export class Body extends VisualObject {
    //Matadata
    protected override __importable = false;
    protected override __namespace = "Body";
    protected override __resizable = false;
    protected override __moveble = false;
    protected override __group = "";
    protected override __icon = "fa-regular fa-square-full";

    public _border: Border;
    public _background: Background;
   
    constructor($argv){
        super($argv);

        this._transform._position = "";
    }
}