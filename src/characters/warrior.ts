import { MonsterData, Warrior } from "alclient";
import { looting } from "../utils/looting.js";
import { GenHP, GenMP } from "../utils/pots.js";
import { oldsingleAttack, singleAttack } from "../utils/attack.js";
import { addHealRequest } from "./preistSkills.js";
import { Revive } from "../utils/healing.js";


export async function WarriorLoop(war: Warrior){
let startingGold = war.gold
let startingXP = war.xp

    setInterval(async () => {
        //logging mana / hp
        let gainedGold = war.gold - startingGold
        console.log(`${war.name} - hp ${war.hp}/${war.max_hp} - mp ${war.mp}/${war.max_mp} - gold Gained ${gainedGold} - XP/m ${war.xpm}`)
    },30000)

    setInterval(async () => {
        if (war.rip) Revive(war);
        // console.log(war.name)
        looting(war)
        if (war.mp < (war.max_mp - 100)){
            console.log(`${war.name} - should useMP Regen`)
            await GenMP(war)
        }
        if (war.hp < (war.max_hp - 100)){
            console.log(`${war.name} - should useHP Regen`)
            await GenHP(war)
        }
        if (war.hp < (war.max_hp - 400)){
            console.log(`${war.name} - needs Healing`)
            await addHealRequest(war)
        }
        singleAttack(war, "goo")
    },200)
}