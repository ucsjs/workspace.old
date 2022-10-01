import { Component } from "../Types/Component.type";

export class Link extends Component {
    protected override __namespace = "Link";
    protected override __fixed = true;
    protected override __importable = false;
    protected override __icon = "fa-solid fa-link";

    private __target = ["_blank", "_self", "_parent", "_top"];
    
    public _href: string = "";
    private __hrefHelp = "https://www.w3schools.com/tags/att_a_href.asp";

    public _hreflang: string = "";
    private __hreflangHelp = "https://www.w3schools.com/tags/att_a_hreflang.asp";

    public _media: string = "";
    private __mediaHelp = "https://www.w3schools.com/tags/att_a_media.asp";

    public _ping: string = "";
    private __pingHelp = "https://www.w3schools.com/tags/att_a_ping.asp";

    public _referrerpolicy: string = "";
    private __referrerpolicyHelp = "https://www.w3schools.com/tags/att_a_referrepolicy.asp";

    public _rel: string = "";
    private __relHelp = "https://www.w3schools.com/tags/att_a_rel.asp";

    public _target: string = "";
    private __targetHelp = "https://www.w3schools.com/tags/att_a_target.asp";

    public _type: string = "";
    private __typeHelp = "https://www.w3schools.com/tags/att_a_type.asp";
}