import { Component } from "../../Types/Component.type";
import { ImageType } from "../../Types/Image.type";

export class Image extends Component {
    protected override __namespace = "Image";
    protected override __icon = "fa-regular fa-image";
    protected override __fixed = true;
    protected override __importable = false;
     
    public _image: ImageType = { src: ""};
    
    public _alt: string = "";
    private __altHelp = "https://www.w3schools.com/tags/att_img_alt.asp";
    
    public _title: string = "";
    private __titleHelp = "https://www.w3schools.com/tags/att_global_title.asp";

    public _width: number = 0;
    private __widthHelp = "https://www.w3schools.com/tags/att_img_width.asp";

    public _height: number = 0;
    private __heightHelp = "https://www.w3schools.com/tags/att_img_height.asp";
}