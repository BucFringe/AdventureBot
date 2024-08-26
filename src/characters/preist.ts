import { Priest } from "alclient";
import { GenMP } from "../utils/pots.js";
import { HealSkillQueue } from "./preistSkills.js";
import { MonsterHunt, SendMoney } from "../utils/looting.js";
import { Revive } from "../utils/healing.js";
import { CharacterMonitoring, EquipMonitoring } from "../monitoring.js";
import { PartyInviteRequest } from "../utils/party.js";
import { singleAttack } from "../utils/attack.js";

let HealingList= []

export async function PriestLoop(pre: Priest){
    let startingGold = pre.gold
    PartyInviteRequest(pre);
    
    setInterval(() => {
        CharacterMonitoring(pre)
    }, 500);

    setInterval(async () =>{
        console.log(pre.slots)
        await SendMoney(pre)
    }, 100000)

    setInterval(async () => {
        //logging mana / hp
        let gainedGold = pre.gold - startingGold
        console.log(`${pre.name} - hp ${pre.hp}/${pre.max_hp} - mp ${pre.mp}/${pre.max_mp} - gold Gained ${gainedGold} - XP/m ${pre.xpm}`)
        console.log(`${pre.name} - Monster hunt ${pre.s.monsterhunt?.id}`) 
        EquipMonitoring(pre)
    },30000)

    setInterval(async () => {
        if (pre.rip) Revive(pre);
        await MonsterHunt(pre)
        if (pre.mp < (pre.max_mp - 100)){
            console.log(`${pre.name} - should useMP Regen`)
            await GenMP(pre)
        }
        if (HealingList.length > 0){
            await HealSkillQueue(pre)
        } else {
            if(pre.smartMoving) return;
            await pre.smartMove("goo")
        }
        singleAttack(pre, "goo")
    },250)
    
}
