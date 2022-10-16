($inputs) => {
    let options = {};

    if($inputs["localeMatcher"])
        options["localeMatcher"] = $inputs["localeMatcher"] || "best fit";

    if($inputs["style"])
        options["style"] = $inputs["style"] || "decimal";

    if($inputs["currency"])
        options["currency"] = $inputs["currency"];

    if($inputs["currencyDisplay"])
        options["currencyDisplay"] = $inputs["currencyDisplay"] || "symbol";

    if($inputs["useGrouping"])
        options["useGrouping"] = $inputs["useGrouping"] || true;
    
    return typeof $inputs["value"] === "number" ? $inputs["value"].toLocaleString($inputs["locale"], options) : "";
};