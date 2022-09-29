import { BoxVisual } from "./Box.component";
import { Image } from "../../Components/Image.component";

export class ImageVisual extends BoxVisual {
    //Matadata
    protected override __namespace = "Image";
    protected override __group = "Core";
    protected override __icon = "fa-regular fa-image";

    public _image: Image;
    
    constructor($argv){
        super($argv);

        this._transform._position = "absolute";
    }

    public content(){
        return "<img :src='component.Image.image.src' :style='component.style' :alt='component.Image.alt' :title='component.Image.title' :width='component.Image.width' :height='component.Image.height' />";
    }
}