import { Component } from "../Types/Component.type";
import { ImageType } from "../Types/Image.type";

export class Image extends Component {
    protected override __namespace = "Image";
    protected override __icon = "fa-regular fa-image";
    protected override __fixed = true;
    protected override __importable = false;
     
    public _image: ImageType = { src: ""};
    public _alt: string = "";
    public _title: string = "";
    public _width: number = 0;
    public _height: number = 0;
}