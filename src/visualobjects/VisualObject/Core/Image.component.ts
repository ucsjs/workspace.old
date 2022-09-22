import { VisualObject } from "../../Components/VisualObject.component";
import { Image } from "../../Components/Image.component";

export class ImageVisual extends VisualObject {
    //Matadata
    protected override __namespace = "Image";
    protected override __group = "Core";
    protected override __icon = "fa-regular fa-image";

    public _image: Image;
    
    constructor($argv){
        super($argv);
    }

    public content(){
        return "<img :src='component.Image.image.src' :style='component.style' :alt='component.Image.alt' :title='component.Image.title' :width='component.Image.width' :height='component.Image.height' />";
    }
}