($input, $events, $output) => {
    if($input?.siteKey){
        let scriptElement = document.createElement("script");

        scriptElement.setAttribute("src", "https://www.google.com/recaptcha/api.js");
        scriptElement.setAttribute("type", "text/javascript");
        scriptElement.setAttribute("async", true);

        scriptElement.addEventListener("load", () => {
            grecaptcha.ready(() => {
                grecaptcha.execute($input.siteKey, { action: $input.action }).then((token) => {
                    $output.token.next(token);
                });
            });
        });
    }
}