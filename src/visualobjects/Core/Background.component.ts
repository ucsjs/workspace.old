import { Component } from "../Types/Component.type";
import { Color } from "../Types/Color.type";

export class Background extends Component {
    //Matadata
    protected override __namespace = "Background";
    protected override __group = "Core";
    protected override __icon = "fa-solid fa-paint-roller";
    protected override __fixed = true;
    protected override __importable = false;

    private __attachment = ["scroll", "fixed", "local", "initial", "inherit"];

    public _color: Color = { r: 0, g: 0, b: 0, a: 1, hex: "#FFFFFF" };
    private _colorChangeStyle = { style: "background-color", styleVue: "backgroundColor" };

    public _attachment: string;
    private _attachmentChangeStyle = { style: "background-attachment", styleVue: "backgroundAttachment" };

    public _blendMode: string;
    private _blendModeChangeStyle = { style: "background-blend-mode", styleVue: "background-blend-mode" };

    public _clip: string;
    private _clipChangeStyle = { style: "background-clip", styleVue: "backgroundClip" };

    public _origin: string;
    private _originChangeStyle = { style: "background-origin", styleVue: "backgroundOrigin" };

    public _position: string;
    private _positionChangeStyle = { style: "background-position", styleVue: "backgroundPosition" };

    public _repeat: string;
    private _repeatChangeStyle = { style: "background-repeat", styleVue: "backgroundRepeat" };
}