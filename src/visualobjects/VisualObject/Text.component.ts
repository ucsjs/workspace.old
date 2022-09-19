import { VisualObject } from "../Core/VisualObject.component";
import { Font } from "../Core/Font.component";

export class Text extends VisualObject{
    //Matadata
    protected override __namespace = "Text";
    protected override __importable = true;
    protected override __group = "Core";
    protected override __icon = "fa-solid fa-i-cursor";

    public _font: Font;
    
    constructor($argv){
        super($argv);
    }
}