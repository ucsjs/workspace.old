/**
 * Gamepad API Blueprint
 * 
 * The Gamepad API is a way for developers to access and respond to 
 * signals from gamepads and other game controllers in a simple, 
 * consistent way. It contains three interfaces, two events and one 
 * specialist function, to respond to gamepads being connected and disconnected, 
 * and to access other information about the gamepads themselves, and what buttons 
 * and other controls are currently being pressed.
 * 
 * @version 0.0.1
 * @author: Andre Ferreira <andre@ucsjs.io>
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API
 */

import { Blueprint, Type } from "@ucsjs/blueprint";

export class GamepadClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Gamepad";
    private __group = "Web APIs";
    private __headerColor = "#332946";
    private __headerIcon = "fa-solid fa-gamepad";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API";

    constructor(metadata?: any){
        super();
        this.output("id", Type.String, null);
        this.output("index", Type.Int, null);
        this.output("mapping", Type.String, null);
        this.output("axes", Type.Array, null);
        this.output("buttons", Type.Array, null);
        this.output("connected", Type.Boolean, null);
        this.output("timestamp", Type.Int, null);

        this.event("connected");
        this.event("disconnected");
    }
}