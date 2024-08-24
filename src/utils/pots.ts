import { Character } from "alclient";
import { logger } from "./logger.js";


export async function GenMP(char: Character){
    if(!char.isOnCooldown('regen_mp')){
        // Character can regen MP
        await char.regenMP()
        console.log(`${char.name} - used MPGEN`)
    }
}

export async function GenHP(char: Character){
    if(!char.isOnCooldown('regen_hp')){
        // Character can regen MP
        await char.regenHP()
        console.log(`${char.name} - used HPGEN`)
    }
}