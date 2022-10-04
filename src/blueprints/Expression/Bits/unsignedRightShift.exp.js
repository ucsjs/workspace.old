($inputs) => {
    if($inputs["expr1"] !== undefined && $inputs["expr2"] !== undefined) 
        return $inputs["expr1"] >>> $inputs["expr2"];
    else
        return undefined;
};