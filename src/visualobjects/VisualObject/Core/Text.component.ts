import { Font } from "../../Components/Font.component";
import { Content } from "../../Components/Content.component";
import { BoxVisual } from "./Box.component";

export class TextVisual extends BoxVisual {
    //Matadata
    protected override __namespace = "Text";
    protected override __group = "Core";
    protected override __icon = "fa-solid fa-align-center";

    public _font: Font;
    public _content: Content;
    
    constructor($argv){
        super($argv);

        this._transform._width = 240;
        this._transform._height = 40;
        this._content._text = { content: "Text..." };
    }

    public content(){
        return "<div :style='component.style'>{{ component.Content?.text.content }}</div>";
    }
}