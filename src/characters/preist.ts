import { Priest } from "alclient";
import { GenMP } from "../utils/pots.js";
import { HealSkillQueue } from "./preistSkills.js";
import { MonsterHunt, SendMoney } from "../utils/looting.js";
import { Revive } from "../utils/healing.js";
import { CharacterMonitoring } from "../monitoring.js";

let HealingList= []

export async function PriestLoop(pre: Priest){
    
    setInterval(() => {
        CharacterMonitoring(pre)
    }, 500);

    setInterval(async () =>{
        console.log(pre.slots)
        await SendMoney(pre)
    }, 100000)

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
    },1000)
    
}
