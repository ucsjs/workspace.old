/**
 * Geolocation API Blueprint
 * 
 * The Geolocation API allows the user to provide their location to web 
 * applications if they so desire. For privacy reasons, the user is asked 
 * for permission to report location information.
 * 
 * WebExtensions that wish to use the Geolocation object must 
 * add the "geolocation" permission to their manifest. The user's 
 * operating system will prompt the user to allow location access the 
 * first time it is requested.
 * 
 * @version 0.0.1
 * @author: Andre Ferreira <andre@ucsjs.io>
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */

import { Blueprint, Type } from "@ucsjs/blueprint";

export class GeoLocationClientBlueprint extends Blueprint{
    //Metadata
    private __namespace = "GeoLocation";
    private __group = "Web APIs";
    private __headerColor = "#332946";
    private __headerIcon = "fa-solid fa-location-pin";
    private __help = "https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API";
    private __trigger = true;

    constructor(metadata?: any){
        super();
        this.output("latitude", Type.Float, null);
        this.output("longitude", Type.Float, null);
        this.output("altitude", Type.Float, null);
        this.output("accuracy", Type.Float, null);
        this.output("altitudeAccuracy", Type.Float, null);
        this.output("heading", Type.Float, null);
        this.output("speed", Type.Float, null);
        this.output("error", Type.String, null);
        this.event("error");
    }
}