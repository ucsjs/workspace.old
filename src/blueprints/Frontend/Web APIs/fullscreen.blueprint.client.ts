/**
 * Fullscreen Blueprint
 * 
 * @version 0.0.1
 * @author: Andre Ferreira <andre@ucsjs.io>
 */

import { Blueprint } from "@ucsjs/blueprint";

export class FullscreenClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Fullscreen";
    private __group = "Web APIs";
    private __headerColor = "#332946";
    private __headerIcon = "fa-solid fa-maximize";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API";
    private __trigger = true;
}