($input, $events) => {
    if($input?.key){
        localStorage.removeItem($input.key);
        $events.emit('done');
    }
}