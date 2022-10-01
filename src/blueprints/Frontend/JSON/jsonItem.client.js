($input, $events, $outputs) => {
    if($input?.value && $input?.key){
        let tmpJSON = {}
        tmpJSON[$input.key] = $input.value;
        $outputs.result.next(tmpJSON);
    }
}