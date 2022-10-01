($data, $events, $output) => {
    if(typeof $data?.callback == "function" && $output?.promise){
        $output?.promise.next(new Promise($data.callback));
    }
}