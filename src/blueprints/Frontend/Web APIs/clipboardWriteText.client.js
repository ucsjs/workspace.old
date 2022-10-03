/**
 * Clipboard API Frontend
 * 
 * The Clipboard API provides the ability to respond to clipboard 
 * commands (cut, copy, and paste) as well as to asynchronously 
 * read from and write to the system clipboard.
 * 
 * @version 0.0.1
 * @author: Andre Ferreira <andre@ucsjs.io>
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
 */

($input, $events) => {
    if($input?.value){
        navigator.clipboard.writeText($input.value);
        $events.emit('done');
    }
}