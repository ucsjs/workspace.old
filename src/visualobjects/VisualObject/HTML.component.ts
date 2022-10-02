import { CoreObject } from "../Components/Core/CoreObject.componen";
import { Head } from "./Head.component";
import { Body } from "./Body.component";

export class HTML extends CoreObject {
    //Matadata
    protected override __importable = false;
    protected override __namespace = "HTML";
    protected override __resizable = false;
    protected override __moveble = false;

    public _head: Head;
    public _body: Body;
}