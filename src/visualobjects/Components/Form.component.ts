import { Component } from "../Types/Component.type";

export class Form extends Component {
    protected override __namespace = "Font";
    protected override __fixed = true;
    protected override __importable = false;
    protected override __icon = "fa-solid fa-border-none";

    private __acceptCharset = ["UTF-8", "ISO-8859-1"];
    private __enctype = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"];
    private __method = ["get", "post"];
    private __target = ["_blank", "_self", "_parent", "_top"];
    
    public _acceptCharset: string = "UTF-8";
    private __acceptCharsetHelp = "https://www.w3schools.com/tags/att_form_accept_charset.asp";

    public _action: string = "";
    private __actionHelp = "https://www.w3schools.com/tags/att_form_action.asp";

    public _enctype: string = "";
    private __enctypeHelp = "https://www.w3schools.com/tags/att_form_enctype.asp";

    public _method: string = "post";
    private __methodHelp = "https://www.w3schools.com/tags/att_form_method.asp";

    public _name: string = "";
    private __nameHelp = "https://www.w3schools.com/tags/att_form_name.asp";

    public _novalidate: boolean = false;
    private __novalidateHelp = "https://www.w3schools.com/tags/att_form_novalidate.asp";

    public _rel: boolean = false;
    private __relHelp = "https://www.w3schools.com/tags/att_form_rel.asp";

    public _target: boolean = false;
    private __targetHelp = "https://www.w3schools.com/tags/att_form_target.asp";
}