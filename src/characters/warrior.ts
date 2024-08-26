import { Warrior } from "alclient";
import { looting, MonsterHunt, SendMoney } from "../utils/looting.js";
import { GenHP, GenMP } from "../utils/pots.js";
import { singleAttack } from "../utils/attack.js";
import { addHealRequest } from "./preistSkills.js";
import { Revive } from "../utils/healing.js";
import { CharacterMonitoring, EquipMonitoring } from "../monitoring.js";
import { PartyInviteRequest } from "../utils/party.js";



export async function WarriorLoop(war: Warrior){
    let startingGold = war.gold
    PartyInviteRequest(war);

    setInterval(async () =>{
        console.log(war.slots)
        await SendMoney(war)
    }, 100000)

    setInterval(() => {
        CharacterMonitoring(war)
    }, 500);

    setInterval(async () => {
        //logging mana / hp
        let gainedGold = war.gold - startingGold
        console.log(`${war.name} - hp ${war.hp}/${war.max_hp} - mp ${war.mp}/${war.max_mp} - gold Gained ${gainedGold} - XP/m ${war.xpm}`)
        console.log(`${war.name} - Monster hunt ${war.s.monsterhunt?.id}`) 
        EquipMonitoring(war)
    },30000)

    setInterval(async () => {
        if (war.rip) Revive(war);
        // console.log(war.name)
        looting(war)
        // await MonsterHunt(war)
        if (war.mp < (war.max_mp - 100)){
            // console.log(`${war.name} - should useMP Regen`)
            await GenMP(war)
        }
        if (war.hp < (war.max_hp - 100)){
            // console.log(`${war.name} - should useHP Regen`)
            await GenHP(war)
        }
        if (war.hp < (war.max_hp - 400)){
            // console.log(`${war.name} - needs Healing`)
            await addHealRequest(war)
        }
        singleAttack(war, "goo")
    },200)
}