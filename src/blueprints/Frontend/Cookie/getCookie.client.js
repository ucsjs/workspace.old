($input, $events, $outputs) => {
    if($input?.key){
        let name = $input?.key + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        let value = "";

        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];

            while (c.charAt(0) == ' ') 
                c = c.substring(1);
            
            if (c.indexOf(name) == 0) 
                value = c.substring(name.length, c.length);
        }

        if(value)
            $outputs.value.next(value);
    }
}