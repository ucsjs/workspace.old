import { MongooseModule } from '@nestjs/mongoose';

exports.default = async ($metadata, $blueprint, $itemKey) => {
    let $module = "";

    let $settings = { 
        protocol: "mongodb",
        host: null, 
        port: null, 
        user: null, 
        pass: null, 
        db: null 
    };
    
    let $routes = [];

    for(let publicVar of $metadata.publicVars){
        try{
            switch(publicVar.name){
                case "host": $settings['host'] = publicVar.value || publicVar.default; break;
                case "port": $settings['port'] = publicVar.value || publicVar.default; break;
                case "user": $settings['user'] = publicVar.value || publicVar.default; break;
                case "pass": $settings['pass'] = publicVar.value || publicVar.default; break;
                case "db": $settings['db'] = publicVar.value || publicVar.default; break;
            }
        }
        catch(e){}
    }

    if($settings.host && $settings.port && $settings.db){
        const protocol = $settings.protocol || "mongodb";
        let uri = `${$settings.host}:${$settings.port}/${$settings.db}`;

        if($settings.user && $settings.pass)
            uri = `${$settings.user}:${$settings.pass}@${uri}`;

        $module += `\nimport { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
        
@Module({
    imports: [MongooseModule.forRoot('${protocol}://${uri}')]
})
export class LazyModule {}`;
    }   

    return $module;
};