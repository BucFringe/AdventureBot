import { Mage, MonsterData} from "alclient";
import { looting } from "../utils/looting.js";
import { GenHP, GenMP } from "../utils/pots.js";
import { oldsingleAttack, singleAttack } from "../utils/attack.js";
import { addHealRequest } from "./preistSkills.js";
import { Revive } from "../utils/healing.js";


export async function MageLoop(mag: Mage){
let startingGold = mag.gold

    setInterval(async () => {
        //logging mana / hp
        let gainedGold = mag.gold - startingGold
        console.log(`${mag.name} - hp ${mag.hp}/${mag.max_hp} - mp ${mag.mp}/${mag.max_mp} - gold Gained ${gainedGold} - XP/m ${mag.xpm}`)
        try{
            if(!mag.party) await mag.acceptPartyInvite(`Vendi`)
        } catch(e){
            console.log(`${mag.name} cannot accept party - ${e}`)
        }
    },30000)

    setInterval(async () => {
        if (mag.rip) Revive(mag);
        // console.log(mag.name)
        looting(mag)
        if (mag.mp < (mag.max_mp - 100)){
            console.log(`${mag.name} - should useMP Regen`)
            await GenMP(mag)
        }
        if (mag.hp < (mag.max_hp - 100)){
            console.log(`${mag.name} - should useHP Regen`)
            await GenHP(mag)
        }
        if (mag.hp < (mag.max_hp - 400)){
            console.log(`${mag.name} - needs Healing`)
            await addHealRequest(mag)
        }
        singleAttack(mag, "goo")
    },200)
}