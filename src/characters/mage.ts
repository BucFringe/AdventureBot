import { Mage, MonsterData} from "alclient";
import { looting, MonsterHunt, SendMoney } from "../utils/looting.js";
import { GenHP, GenMP } from "../utils/pots.js";
import { singleAttack } from "../utils/attack.js";
import { addHealRequest } from "./preistSkills.js";
import { Revive } from "../utils/healing.js";
import { CharacterMonitoring } from "../monitoring.js";



export async function MageLoop(mag: Mage){
    let startingGold = mag.gold

    setInterval(() => {
        CharacterMonitoring(mag)
    }, 500);

    setInterval(async () =>{
        console.log(mag.slots)
        // await SendMoney(mag)
    }, 100000)

    setInterval(async () => {
        //logging mana / hp
        let gainedGold = mag.gold - startingGold
        console.log(`${mag.name} - hp ${mag.hp}/${mag.max_hp} - mp ${mag.mp}/${mag.max_mp} - gold Gained ${gainedGold} - XP/m ${mag.xpm}`)
        console.log(`${mag.name} - Monster hunt ${mag.s.monsterhunt?.id}`) 
        try{
            // if(!mag.party) await mag.acceptPartyInvite(`Vendi`)
        } catch(e){
            console.log(`${mag.name} cannot accept party - ${e}`)
        }
    },30000)

    setInterval(async () => {
        if (mag.rip) Revive(mag);
        // console.log(mag.s.monsterhunt)
        looting(mag)
        if (!mag.s.monsterhunt?.id){
            await MonsterHunt(mag)
        } else {
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
        }
    }, 200)
}