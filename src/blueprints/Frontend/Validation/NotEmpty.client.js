($data, $events) => {
    if($data?.input !== null && $data?.input !== undefined && $data?.input !== '') 
        $events.emit('True');
    else  
        $events.emit('False');
}