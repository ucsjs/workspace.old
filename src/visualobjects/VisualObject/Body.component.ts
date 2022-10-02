import { CoreObject } from "../Components/Core/CoreObject.componen";
import { Head } from "./Head.component";
import { Border } from "../Components/Style/Border.component";
import { Background } from "../Components/Style/Background.component";
import { Transform } from "../Components/Style/Transform.component";
import { Class } from "../Components/Style/Class.component";
import { Margin } from "../Components/Style/Margin.component";

export class Body extends CoreObject {
    //Matadata
    protected override __importable = false;
    protected override __namespace = "Body";
    protected override __resizable = false;
    protected override __moveble = false;

    public _class: Class;
    public _transform: Transform;
    public _margin: Margin;
    public _border: Border;
    public _background: Background;
   
    constructor($argv){
        super($argv);

        this._margin._marginBottom = 0;
        this._margin._marginTop = 0;
        this._margin._marginLeft = 0;
        this._margin._marginRight = 0;
        this._transform._position = "";
    }
}