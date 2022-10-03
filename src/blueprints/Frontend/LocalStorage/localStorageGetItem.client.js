($input, $events, $outputs) => {
    if($input?.key){
        const value = localStorage.getItem($input.key);
        $outputs.value.next(value);
    }
}