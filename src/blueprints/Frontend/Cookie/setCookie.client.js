($input) => {
    if($input?.key && $input?.value){
        const expires = $input?.expires || 3600;
        const maxAge = $input?.maxAge || 3600;
        const domain = $input?.domain || "";
        const path = $input?.path || "/";
        const secure = $input?.secure || false;
        const httpOnly = $input?.httpOnly || false;
        const sameSite = $input?.sameSite || "Strict";

        let queryCreate = `${$input?.key}=${$input?.value};`;

        if(expires > 0)
            queryCreate += `expires=${new Date(Date.now() + expires * 1000).toUTCString()};`;

        if(maxAge > 0)
            queryCreate += `max-age=${maxAge};`;

        if(domain)
            queryCreate += `domain=${domain};`;

        if(path)
            queryCreate += `path=${path};`;

        if(secure)
            queryCreate += `secure;`;

        if(httpOnly)
            queryCreate += `httpOnly;`;

        if(sameSite)
            queryCreate += `sameSite=${sameSite};`;

        document.cookie = queryCreate;
    }
}