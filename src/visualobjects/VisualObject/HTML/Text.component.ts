import { Font } from "../../Components/Style/Font.component";
import { Content } from "../../Components/HTML/Content.component";
import { BoxVisual } from "./Box.component";

export class TextVisual extends BoxVisual {
    //Matadata
    protected override __namespace = "Text";
    protected override __group = "HTML";
    protected override __icon = "fa-solid fa-align-center";
    protected override __resizable = true;
    protected override __moveble = true;

    public _font: Font;
    public _content: Content;
    
    constructor($argv){
        super($argv);

        this._transform._position = "absolute";
        this._transform._width = 240;
        this._transform._height = 40;
        this._content._text = { content: "Text..." };
    }

    public content(){
        return "<div :style='component.style'>{{ component.Content.text?.content }}</div>";
    }
}