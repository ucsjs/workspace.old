import { VisualObject } from "../Core/VisualObject.component";
import { Font } from "../Core/Font.component";
import { Content } from "../Core/Content.component";
import { Background } from "../Core/Background.component";

export class Text extends VisualObject {
    //Matadata
    protected override __namespace = "Text";
    protected override __group = "Core";
    protected override __icon = "fa-solid fa-i-cursor";

    public _background: Background;
    public _font: Font;
    public _text: Content;
    
    constructor($argv){
        super($argv);

        this._dimensions._width = 240;
        this._dimensions._height = 40;
    }

    public content(){
        return "{{component.Content?.content}}";
    }
}