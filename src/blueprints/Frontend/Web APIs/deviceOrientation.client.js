/**
 * Device Orientation API Frontend
 * 
 * The deviceorientation event is fired when fresh data is available from an orientation 
 * sensor about the current orientation of the device as compared to the Earth coordinate 
 * frame. This data is gathered from a magnetometer inside the device.
 * 
 * @version 0.0.1
 * @author: Andre Ferreira <andre@ucsjs.io>
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event
 */

($input, $events) => {
    window.addEventListener("deviceorientation", (event) => {
        $outputs.absolute.next(event.absolute);
        $outputs.alpha.next(event.alpha);
        $outputs.beta.next(event.beta);
        $outputs.gamma.next(event.gamma);
        $events.emit("change", event);
    }, true);
}