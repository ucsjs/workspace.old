/**
 * Device Motion API Frontend
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

($input, $events, $outputs) => {
    window.addEventListener("devicemotion", (event) => {
        $outputs.acceleration.next(event.acceleration);
        $outputs.accelerationIncludingGravity.next(event.accelerationIncludingGravity);
        $outputs.rotationRate.next(event.rotationRate);
        $outputs.interval.next(event.interval);
        $events.emit("change", event);
    }, true);
}