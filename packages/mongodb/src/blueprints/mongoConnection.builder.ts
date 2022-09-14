exports.default = async ($metadata, $blueprint, $itemKey, $moduleInjection, $stateId) => {
    let $settings = {
        connectionName: `mongodb_${$itemKey}`,
        protocol: "mongodb",
        host: "localhost",
        port: null,
        ignorePort: false,
        db: null,
        user: null,
        pass: null,
    };

    for(let publicVar of $metadata.publicVars)
        $settings[publicVar.name] = publicVar.value || publicVar.default;
    
    if($settings.host && $settings.port && $settings.db){
        const protocol = $settings.protocol || "mongodb";

        let uri = (!$settings.ignorePort) ? `${$settings.host}:${$settings.port}/${$settings.db}` : `${$settings.host}/${$settings.db}`;

        if($settings.user && $settings.pass)
            uri = `${$settings.user}:${$settings.pass}@${uri}`;

        const query = [];

        for(let key in $settings){
            const queryParams = ["replicaSet", "tls", "authSource"];

            if(queryParams.includes(key))
                query.push(`${key}=${$settings[key]}`);
        }

        if(query.length > 0)
            uri += `?${query.join("&")}`;

        return {
            imports: [
                `import { Document, Model, createConnection } from "mongoose";`,
                `import { MongooseModule, Prop, Schema, SchemaFactory, InjectModel } from '@nestjs/mongoose';`,
                `const ${$settings.connectionName} = createConnection("${protocol}://${uri}");`
            ],
            constructors: [{
                injection: `${$settings.connectionName}`
            }],
        };
    }   
};