import { Priest, Game, Player } from "alclient";
import { GenMP } from "../utils/pots.js";
import { HealSkillQueue } from "./preistSkills.js";
import { MonsterHunt } from "../utils/looting.js";
import { Revive } from "../utils/healing.js";

let HealingList= []

export async function PriestLoop(pre: Priest){
    
    setInterval(async () => {
        if (pre.rip) Revive(pre);
        await MonsterHunt(pre)
        if (pre.mp < (pre.max_mp - 100)){
            console.log(`${pre.name} - should useMP Regen`)
            await GenMP(pre)
        }
        await pre.smartMove("goo")
        await HealSkillQueue(pre)

    },1000)
    
}