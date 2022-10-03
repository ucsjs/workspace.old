/**
 * Device Orientation API Blueprint
 * 
 * The deviceorientation event is fired when fresh data is available from an orientation 
 * sensor about the current orientation of the device as compared to the Earth coordinate 
 * frame. This data is gathered from a magnetometer inside the device.
 * 
 * @version 0.0.1
 * @author: Andre Ferreira <andre@ucsjs.io>
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event
 */

import { Blueprint, Type } from "@ucsjs/blueprint";

export class DeviceOrientationClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "Device Orientation";
    private __group = "Web APIs";
    private __headerColor = "#332946";
    private __headerIcon = "fa-solid fa-mobile-screen";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events/Detecting_device_orientation";
 
    constructor(metadata?: any){
        super();
        this.output("absolute", Type.Boolean, null);
        this.output("alpha", Type.Int, null);
        this.output("beta", Type.Int, null);
        this.output("gamma", Type.Int, null);
        this.event("change");
    }
}