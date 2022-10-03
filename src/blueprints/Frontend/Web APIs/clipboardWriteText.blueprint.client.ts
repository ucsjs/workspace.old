/**
 * Clipboard API Blueprint
 * 
 * The Clipboard API provides the ability to respond to clipboard 
 * commands (cut, copy, and paste) as well as to asynchronously 
 * read from and write to the system clipboard.
 * 
 * @version 0.0.1
 * @author: Andre Ferreira <andre@ucsjs.io>
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
 */

import { Blueprint, Type } from "@ucsjs/blueprint";

export class ClipboardWriteTextClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Clipboard Write Text";
    private __group = "Web APIs";
    private __headerColor = "#332946";
    private __headerIcon = "fa-solid fa-copy";
    private __help = "https://www.w3schools.com/howto/howto_js_copy_clipboard.asp";
 
    constructor(metadata?: any){
        super();
        this.setup(metadata);
        this.input("value", Type.String, null);
        this.event("done");
    }
}