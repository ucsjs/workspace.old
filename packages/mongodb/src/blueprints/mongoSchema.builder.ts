exports.default = async ($metadata, $blueprint, $itemKey, $moduleInjection, $stateId) => {
    let $module = "";

    let $settings = { 
        collection: "",
        timestamps: false,
        fields: []
    };

    for(let publicVar of $metadata.publicVars)
        $settings[publicVar.name] = publicVar.value || publicVar.default;
    
    if($settings.collection){
        const timestamps = ($settings.timestamps) ? $settings.timestamps : false;
        const collectionClassName = $settings.collection.charAt(0).toUpperCase() + $settings.collection.slice(1).toLowerCase();
        let fieldsInterface = "";
        let fieldsMongoose = "";

        if(Array.isArray($settings.fields)){
            for(let $item of $settings.fields){
                const type = $item.type || "String";
                let typeInterface = type;
                const index = $item.index || false;
                const required = $item.required || false;
                const unique = $item.unique || false;
    
                switch(type){
                    case "String": 
                    case "Number": 
                    case "Boolean": 
                        fieldsInterface += `\n\t${$item.name}: ${type.toLocaleLowerCase()};`;
                        typeInterface = type.toLocaleLowerCase();
                    break;
                    case "Mixed": 
                        fieldsInterface += `\n\t${$item.name}: any;`;
                        typeInterface = "any";
                    break;
                    default:
                        fieldsInterface += `\n\t${$item.name}: ${type};`;
                    break;
                }
    
                fieldsMongoose += `\n\t@Prop({ required: ${required}, index:${index}, type: ${type}, unique: ${unique} })
        ${$item.name}: ${typeInterface};\n`;            
            }
        }

        return {
            imports: [
                `import { Document, Model, createConnection } from "mongoose";`,
                `import { MongooseModule, Prop, Schema, SchemaFactory, InjectModel } from '@nestjs/mongoose';`
            ],
            constructors: [{
                injection: `${collectionClassName}Schema`
            }],
            extras: [`
export interface ${collectionClassName} {${fieldsInterface}
};

@Schema({ timestamps: ${timestamps}, collection: "${$settings.collection}" })
export class ${collectionClassName}Document extends Document implements ${collectionClassName} {${fieldsMongoose}};

export const ${collectionClassName}Schema = SchemaFactory.createForClass(${collectionClassName}Document);`]
        };
    }   

    return {};
};