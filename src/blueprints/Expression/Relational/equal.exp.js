($inputs) => {
    if($inputs["elem1"] !== undefined && $inputs["elem2"] !== undefined)
        return $inputs["elem1"] === $inputs["elem2"];
    else
        return undefined;
};