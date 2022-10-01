import { Link } from "../../Components/Link.component";
import { TextVisual } from "./Text.component";

export class LinkVisual extends TextVisual {
    //Matadata
    protected override __namespace = "Link";
    protected override __group = "Core";
    protected override __icon = "fa-solid fa-link";
    protected override __resizable = true;
    protected override __moveble = true;

    public _link: Link;
    
    constructor($argv){
        super($argv);

        this._transform._position = "absolute";
        this._transform._width = 240;
        this._transform._height = 40;
        this._content._text = { content: "Link" };
    }

    public content(){
        return `<a href='#' :style='component.style'>{{ component.Content.text?.content }}</a>`;
    }
}