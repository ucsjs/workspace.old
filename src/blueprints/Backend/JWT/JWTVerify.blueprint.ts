import * as fs from "fs";
import * as jsonwebtoken from "jsonwebtoken";
import { Logger } from "@nestjs/common";
import { Blueprint, Type } from "@ucsjs/blueprint";
import { JWTTypes } from "./JWTTypes.enum";

export class JWTVerifyBlueprint extends Blueprint{
    //Metadata
    private __namespace = "JWT Verify";
    private __group = "JWT";
    private __headerColor = "#000000";
    private __headerIcon = "./public/icons/jwt.png";
    private __algorithm = ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512", "none"];
    private __help = "https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback";

    public _secret: string = "";
    public _algorithm: string = "HS256";
    public _ignoreExpiration: boolean = false;
    private privateKey = null;

    constructor(metadata?: any){
        super();
        this.setup(metadata);

        this.event("valid");
        this.event("invalid");

        this.input("privateKey", JWTTypes.PrivateKey, null, (privateKey) => {
            this.privateKey = privateKey;
        });

        this.input("token", Type.String, null, (token: any) => {
            if(token){
                Logger.log(`Recive input, generating token...`, "JWTSignBlueprint");
                const secretOrPrivateKey = (this.privateKey !== null) ? fs.readFileSync('private.key') : this._secret;
                let payload = null;

                try{
                    if(typeof secretOrPrivateKey == "string") {
                        payload = jsonwebtoken.verify(token, secretOrPrivateKey, {
                            ignoreExpiration: this._ignoreExpiration
                        });
                    }
                    else {
                        payload = jsonwebtoken.verify(token, secretOrPrivateKey, { 
                            algorithms: [this._algorithm as any],
                            ignoreExpiration: this._ignoreExpiration
                        });
                    }

                    if(payload){
                        this.next("payload", payload);
                        this.trigger("valid");
                    }
                    else{
                        Logger.error(`Error generating token`, "JWTSignBlueprint");
                        this.next("error", `Invalid token`);
                        this.trigger("invalid");
                    }
                }
                catch(err){
                    Logger.error(`Invalid token`, "JWTVerifyBlueprint");
                    this.next("error", `Invalid token`);
                    this.trigger("invalid");
                }
            }            
        });
 
        this.output("payload", Type.JSON, null); 
        this.output("error", Type.String, null);      
    }
}