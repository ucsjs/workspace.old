/**
 * Device Motion API Blueprint
 * 
 * The devicemotion event is fired at a regular interval and indicates 
 * the amount of physical force of acceleration the device is receiving 
 * at that time. It also provides information about the rate of rotation, 
 * if available.
 * 
 * @version 0.0.1
 * @author: Andre Ferreira <andre@ucsjs.io>
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/devicemotion_event
 */

import { Blueprint, Type } from "@ucsjs/blueprint";

export class DeviceMotionClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Device Motion";
    private __group = "Web APIs";
    private __headerColor = "#332946";
    private __headerIcon = "fa-solid fa-mobile-screen";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/API/Window/devicemotion_event";
 
    constructor(metadata?: any){
        super();
        this.output("acceleration", Type.JSON, null);
        this.output("accelerationIncludingGravity", Type.JSON, null);
        this.output("rotationRate", Type.JSON, null);
        this.output("interval", Type.Int, null);
        this.event("change");
    }
}