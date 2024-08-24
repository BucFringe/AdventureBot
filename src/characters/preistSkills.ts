import { Character, Player, Priest } from "alclient";

let HealingList: Character[] = []

export async function addHealRequest(char: Character){
    if(HealingList.includes(char)) return;
    HealingList.push(char);
    console.log(HealingList)
}

export async function HealSkillQueue(pre: Priest){
    if(HealingList.length == 0) return;
    if (!pre.isOnCooldown("heal")){
        // console.log(HealingList)
        let c: Character = HealingList[0]
        console.log(`${pre.name} - Casting Heal on ${c.name}`)
        try{
            await pre.healSkill(c.id)
            HealingList = HealingList.slice(1)
        } catch(e){
            console.log(e)
        }
    }
}

export async function TargetedPriestHeal(pre: Priest, target: Player){
    if (!pre.isOnCooldown("heal")){
        console.log(`${pre.name} - Casting Heal on ${Player.name}`)
        await pre.healSkill(target.id)
    }    
}