($input, $events, $outputs) => {
    if($input?.JSON && $input?.key)
        $outputs.result.next($input.JSON[$input.key]);
}