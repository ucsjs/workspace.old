($input, $events, $outputs) => {
    if($input?.JSON1 && $input?.JSON2){
        let result = {};

        if(Array.isArray($input.JSON1) && Array.isArray($input.JSON2)){
            result = $input.JSON1.concat($input.JSON2);
        }
        else if(typeof scope.state.JSON1 == "object" && typeof $input.JSON2 == "object"){
            result = $input.JSON1;

            for(let key in $input.JSON2)
                result[key] = $input.JSON2[key];
        }

        $outputs.result.next(result);
    }
}