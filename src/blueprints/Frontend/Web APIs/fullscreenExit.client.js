/**
 * Fullscreen Exit Frontend
 * 
 * @version 0.0.1
 * @author: Andre Ferreira <andre@ucsjs.io>
 */

($input, $events, $outputs, $trigger) => {
    $trigger.subscribe(() => {
        if (document.fullscreenElement)
            document.exitFullscreen();
    }); 
}