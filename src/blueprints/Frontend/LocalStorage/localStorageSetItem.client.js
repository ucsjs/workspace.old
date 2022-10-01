($input, $events) => {
    if($input?.value && $input?.key){
        localStorage.setItem($input.key, $input.value);
        $events.emit('done');
    }
}