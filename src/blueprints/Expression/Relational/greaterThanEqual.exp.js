($inputs) => {
    if(typeof $inputs["elem1"] === "number" && typeof $inputs["elem2"] === "number") 
        return $inputs["elem1"] >= $inputs["elem2"];
    else 
        return undefined;
};