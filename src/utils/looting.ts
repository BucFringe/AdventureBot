import { Character, ChestOpenedData, Tools, Constants } from "alclient";
import { CharacterMonitoring } from "../monitoring.js";

export async function looting(char: Character){
    try{
        for(const [id, chest] of char.chests) {
            if (Tools.distance(char, chest) > 800) {
                if (!char.smartMoving){
                    char.smartMove(chest)
                }
            } //Chest is too far away to loot
            // console.log(chest)
            // console.log(`${char.name} - looting`)
            let loot: ChestOpenedData = await char.openChest(id);
            // console.log(`${char.name} - looted ${loot.gold}`)
        }
    } catch(e){
        console.error(e);
    }
}

export async function MonsterHunt(char: Character){
    // Get a new MonsterHunt.
    // Move to the NPC
    // console.log(char.s.monsterhunt)
    if (char.s.monsterhunt == undefined) {
        console.log('We do not have a monsterhunt')
        if(char.smartMoving) return;
        await char.smartMove('monsterhunter')
        if (!char.smartMoving){
            char.getMonsterHuntQuest()
            console.log(char.s.monsterhunt)
        }
        // try{
            // char.getMonsterHuntQuest()
        // } catch(e) {
        //     console.log(e)
        // }
    } else {
        console.log(`I have a monster hunt`)
    }
}