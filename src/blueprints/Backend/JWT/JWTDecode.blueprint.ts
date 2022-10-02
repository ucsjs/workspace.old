import * as jsonwebtoken from "jsonwebtoken";
import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";

export class JWTDecodeBlueprint extends Blueprint{
    //Metadata
    private __namespace = "JWT Decode";
    private __group = "JWT";
    private __headerColor = "#000000";
    private __headerIcon = "./public/icons/jwt.png";
    private __help = "https://www.npmjs.com/package/jsonwebtoken#jwtdecodetoken--optionsk";

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.event("error");

        this.input("token", Type.String, null, (token: any) => {
            if(token){
                Logger.log(`Recive token, decoding token...`, "JWTDecodeBlueprint");

                let payload =  jsonwebtoken.decode(token, { json: true });

                if(payload){
                    Logger.log(`Send decoded payload: ${JSON.stringify(payload)}`, "JWTDecodeBlueprint");
                    this.next("payload", payload);
                }
                else{
                    Logger.error(`Erro to decode token`, "JWTDecodeBlueprint");
                    this.next("error", `Error to decode token`);
                    this.trigger("error");
                }
            }            
        });

        this.output("payload", Type.JSON, null); 
        this.output("error", Type.String, null);      
    }
}