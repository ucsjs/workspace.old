import { CoreObject } from "./CoreObject.componen";
import { Transform } from "../Style/Transform.component";
import { Class } from "../Style/Class.component";
import { Margin } from "../Style/Margin.component";

export class VisualObject extends CoreObject {
    //Matadata
    protected override __namespace = "VisualObject";
    protected override __importable = false;
    
    public _class: Class;
    public _transform: Transform;
    public _margin: Margin;
}