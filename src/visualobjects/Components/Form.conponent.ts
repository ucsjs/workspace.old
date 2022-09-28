import { Component } from "../Types/Component.type";

export class Form extends Component {
    protected override __namespace = "Font";
    protected override __fixed = true;
    protected override __importable = false;
    protected override __icon = "fa-solid fa-border-none";

    private __acceptCharset = ["UTF-8", "ISO-8859-1"];
    
    public _acceptCharset: string = "UTF-8";
    private __acceptCharsetHelp = "https://www.w3schools.com/tags/att_form_accept_charset.asp";
    private _acceptCharsetChangeAttr = { attr: "accept-charset" };
}