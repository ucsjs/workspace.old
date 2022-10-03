/**
 * Gamepad API Frontend
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

($input, $events, $outputs, $trigger) => {
    window.addEventListener("gamepadconnected", (e) => {
        $outputs.id.next(e.gamepad.id);
        $outputs.index.next(e.gamepad.index);
        $outputs.mapping.next(e.gamepad.mapping);
        $outputs.timestamp.next(e.gamepad.timestamp);
        $outputs.connected.next(true);
        $outputs.axes.next(e.gamepad.axes);
        $outputs.buttons.next(e.gamepad.buttons);
        $events.emit('connected');
    });

    window.addEventListener("gamepaddisconnected", (e) => {
        $outputs.id.next(e.gamepad.id);
        $outputs.index.next(e.gamepad.index);
        $events.emit('disconnected');
    })
}