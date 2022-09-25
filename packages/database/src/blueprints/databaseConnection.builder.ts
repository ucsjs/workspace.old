exports.default = async ($metadata, $blueprint, $itemKey, $moduleInjection, $stateId) => {
    let $settings = {
        connectionName: `database${$itemKey}`,
        type: "mysql",
        host: "localhost",
        port: null,
        db: null,
        user: null,
        pass: null,
        synchronize: true,
        logging: true
    };

    for(let publicVar of $metadata.publicVars)
        $settings[publicVar.name] = publicVar.value || publicVar.default;
    
    if($settings.type && $settings.db){
        const type = $settings.type || "mysql";

        const localdatabase = [
            "sqlite", "better-sqlite3", "capacitor",
            "cordova", "react-native", "nativescript"
        ];
        
        $settings.port = parseInt($settings.port);

        return {
            imports: [
                `import { DataSource } from "typeorm";`,
                `\nlet ${$settings.connectionName} = null;
try{ 
    const dataSource${$settings.connectionName} = new DataSource(${JSON.stringify({
        type,
        host: (!localdatabase.includes(type)) ? $settings.host : null,
        port: (!localdatabase.includes(type)) ? $settings.port : null,
        database: $settings.db,
        username: (!localdatabase.includes(type)) ? $settings.user : null,
        password: (!localdatabase.includes(type)) ? $settings.pass : null,
    })}); 

    dataSource${$settings.connectionName}.initialize().then(async (dataSource) => {
        ${$settings.connectionName} = dataSource;
    });
}catch(e){}`
            ],
            constructors: [{
                injection: `${$settings.connectionName}`
            }],
        };
    }   
};