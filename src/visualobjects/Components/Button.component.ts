import { Component } from "../Types/Component.type";
import { IconType } from "../Types/Icon.type";

export class Button extends Component {
    protected override __namespace = "Button";
    protected override __icon = "fa-regular fa-hand-pointer";
    protected override __fixed = true;
    protected override __importable = false;

    private __type = ["button", "reset", "submit"];
     
    public _type: string = "button";
    private __typeHelp = "https://www.w3schools.com/tags/att_button_type.asp";

    public _icon: IconType = { icon: "" };
}