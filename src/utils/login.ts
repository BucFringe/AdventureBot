import { Character, Game, Mage, Merchant, Priest, ServerIdentifier, ServerRegion, Warrior } from "alclient";
import { CharacterConfig, ServerConfig } from "../domain/configInterface.js";
import { WarriorLoop } from "../characters/warrior.js";
import { MageLoop } from "../characters/mage.js";
import { PriestLoop } from "../characters/preist.js";
import { MerchantLoop } from "../characters/merchant.js";

export async function login(charConfig: CharacterConfig, server: ServerConfig){
    console.log(`Logging ${charConfig.name} in to ${server.Area},${server.des}`)
    try{
        if(charConfig.type === "merchant"){
            console.log(`${charConfig.name} - Is a merchant. Logging in`)
            let mer: Merchant = await Game.startMerchant(charConfig.name, server.Area, server.des)
            return mer
        }
        else if(charConfig.type === "warrior"){
            console.log(`${charConfig.name} - Is a Warrior. Logging in`)
            let war: Warrior = await Game.startWarrior(charConfig.name, server.Area, server.des)
            return war
        }
        else if(charConfig.type === "mage"){
            console.log(`${charConfig.name} - Is a mage. Logging in`)
            let mage: Mage = await Game.startMage(charConfig.name, server.Area, server.des)
            return mage
        }
        else if(charConfig.type === "priest"){
            console.log(`${charConfig.name} - Is a priest. Logging in`)
            let preist: Priest = await Game.startPriest(charConfig.name, server.Area, server.des)
            return preist
        }
    } catch(e){
        console.log(`${charConfig.name} - LOGIN FAILED - ${e}`)
    }
}

export async function startLoop(charConfig: CharacterConfig, char: Warrior | Mage | Priest | Merchant){
    if(charConfig.type === "merchant"){
        //do merchant things when i have the loop
        if(char.ctype === "merchant") MerchantLoop(char)
    }
    else if(charConfig.type === "warrior"){
        console.log(`${charConfig.name} - Warrior Starting loop`)
        if(char.ctype === "warrior") WarriorLoop(char)
    }
    else if(charConfig.type === "mage"){
        console.log(`${charConfig.name} - Mage Starting loop`)
        if(char.ctype === "mage") MageLoop(char)
    }
    else if(charConfig.type === "priest"){
        console.log(`${charConfig.name} - Priest Starting loop`)
        if(char.ctype === "priest") PriestLoop(char)
    }
}