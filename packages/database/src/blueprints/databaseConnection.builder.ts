exports.default = async ($metadata, $blueprint, $itemKey, $moduleInjection, $stateId) => {
    let $settings = {
        connectionName: `database_${$itemKey}`,
        type: "mysql",
        host: "localhost",
        port: null,
        db: null,
        user: null,
        pass: null,
    };

    for(let publicVar of $metadata.publicVars)
        $settings[publicVar.name] = publicVar.value || publicVar.default;
    
    if($settings.host && $settings.port && $settings.db){
        const type = $settings.type || "mysql";
        $settings.port = parseInt($settings.port);

        return {
            imports: [
                `import { DataSource } from "typeorm";`,
                `\nlet ${$settings.connectionName} = null;
try{ 
    dataSource${$settings.connectionName} = new DataSource(${JSON.stringify({
        type,
        host: $settings.host,
        port: $settings.port,
        database: $settings.db,
        username: $settings.user,
        password: $settings.pass,
    })}); 

    ${$settings.connectionName} = await dataSource.initialize();
}catch(e){}`
            ],
            constructors: [{
                injection: `${$settings.connectionName}`
            }],
        };
    }   
};