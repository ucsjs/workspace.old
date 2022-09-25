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
    for (let publicVar of $metadata.publicVars)
        $settings[publicVar.name] = publicVar.value || publicVar.default;
    if ($settings.type && $settings.db) {
        const type = $settings.type || "mysql";
        const localdatabase = [
            "sqlite", "better-sqlite3", "capacitor",
            "cordova", "react-native", "nativescript"
        ];
        $settings.port = parseInt($settings.port);
        let $dbConfig = {};
        if (!localdatabase.includes(type)) {
            $dbConfig = {
                type,
                host: $settings.host,
                port: $settings.port,
                database: $settings.db
            };
            if ($settings.user)
                $dbConfig.username = $settings.user;
            if ($settings.pass)
                $dbConfig.password = $settings.pass;
        }
        else {
            $dbConfig = { type, database: $settings.db };
        }
        return {
            imports: [
                `import { DataSource } from "typeorm";`,
                `\nlet ${$settings.connectionName} = null;
try{ 
    const dataSource${$settings.connectionName} = new DataSource(${JSON.stringify($dbConfig)}); 

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
