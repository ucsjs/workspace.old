($data, $events) => {
    if($data?.input === null || $data?.input === undefined || $data?.input !== '') 
        $events.emit('true');
    else  
        $events.emit('false');
}