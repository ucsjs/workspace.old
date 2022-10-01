($input) => {
    if($input?.key){
        if(browser.cookies)
            browser.cookies.remove({ name: $input?.key });
        else 
            document.cookie = `${$input?.key}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
    }
}