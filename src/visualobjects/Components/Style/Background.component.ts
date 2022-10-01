import { Component } from "../../Types/Component.type";
import { Color } from "../../Types/Color.type";
import { ImageType } from "../../Types/Image.type";

export class Background extends Component {
    //Matadata
    protected override __namespace = "Background";
    protected override __icon = "fa-solid fa-paint-roller";
    protected override __fixed = true;
    protected override __importable = false;

    private __attachment = ["scroll", "fixed", "local", "initial", "inherit"];

    public _image: ImageType = { src: "" };
    private __imageHelp = "https://www.w3schools.com/cssref/pr_background-image.asp";
    private _imageChangeStyle = { style: "background-image", styleVue: "background-image" };

    public _color: Color = { r: 0, g: 0, b: 0, a: 1, hex: "" };
    private __colorHelp = "https://www.w3schools.com/cssref/pr_background-color.asp";
    private _colorChangeStyle = { style: "background-color", styleVue: "background-color" };

    public _attachment: string;
    private __attachmentHelp = "https://www.w3schools.com/cssref/pr_background-attachment.asp";
    private _attachmentChangeStyle = { style: "background-attachment", styleVue: "background-attachment" };

    public _blendMode: string;
    private __blendModeHelp = "https://www.w3schools.com/cssref/pr_background-blend-mode.asp";
    private _blendModeChangeStyle = { style: "background-blend-mode", styleVue: "background-blend-mode" };

    public _clip: string;
    private __clipHelp = "https://www.w3schools.com/cssref/css3_pr_background-clip.asp";
    private _clipChangeStyle = { style: "background-clip", styleVue: "background-clip" };

    public _origin: string;
    private __originHelp = "https://www.w3schools.com/cssref/css3_pr_background-origin.asp";
    private _originChangeStyle = { style: "background-origin", styleVue: "background-origin" };

    public _position: string;
    private __positionHelp = "https://www.w3schools.com/cssref/pr_background-position.asp";
    private _positionChangeStyle = { style: "background-position", styleVue: "background-position" };

    public _repeat: string;
    private __repeatHelp = "https://www.w3schools.com/cssref/pr_background-repeat.asp";
    private _repeatChangeStyle = { style: "background-repeat", styleVue: "background-repeat" };

    public _size: string;
    private __sizeHelp = "https://www.w3schools.com/cssref/css3_pr_background-size.asp";
    private _sizeChangeStyle = { style: "background-size", styleVue: "background-size" };
}