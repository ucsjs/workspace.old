import { VisualObject } from "../../Components/VisualObject.component";
import { Font } from "../../Components/Font.component";
import { Content } from "../../Components/Content.component";
import { Background } from "../../Components/Background.component";

export class TextVisual extends VisualObject {
    //Matadata
    protected override __namespace = "Text";
    protected override __group = "Core";
    protected override __icon = "fa-solid fa-align-center";

    public _background: Background;
    public _font: Font;
    public _text: Content;
    
    constructor($argv){
        super($argv);

        this._transform._width = 240;
        this._transform._height = 40;
    }

    public content(){
        return "{{component.Content?.content}}";
    }
}