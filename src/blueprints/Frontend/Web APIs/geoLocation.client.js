/**
 * Geolocation API Frontend
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

($input, $events, $outputs, $trigger) => {
    $trigger.subscribe(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                $outputs.latitude.next(position.coords.latitude);
                $outputs.longitude.next(position.coords.longitude);
                $outputs.altitude.next(position.coords.altitude);
                $outputs.accuracy.next(position.coords.accuracy);
                $outputs.altitudeAccuracy.next(position.coords.altitudeAccuracy);
                $outputs.heading.next(position.coords.heading);
                $outputs.speed.next(position.coords.speed);
            }, () => {
                $outputs.error.next('Unable to retrieve your location');
                $events.emit('error');
            });
        }
        else{
            $outputs.error.next('Geolocation is not supported by this browser');
            $events.emit('error');
        }
    });
}