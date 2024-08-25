import { Character, ChestOpenedData, Tools, Constants, Game } from "alclient";
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

export async function SendMoney(char: Character){
	if (char.gold > 50000){
		console.log(`${char.name} - Sending gold to Merchant`)
		//await char.sendGold('Vendi', char.gold)
	}
}

export async function MonsterHunt(char: Character){
    // Get a new MonsterHunt.
    // Move to the NPC
    // console.log(char.s.monsterhunt)
    try{
        if (char.s.monsterhunt == undefined) {
            console.log('We do not have a monsterhunt')
            if (!char.smartMoving){
                await char.smartMove('monsterhunter')
                try {
                    char.getMonsterHuntQuest()
                    console.log(char.s.monsterhunt)
                } catch(e){
                    console.log(`${char.name} - MonsterHunt Attempt - ${e}`)
                }
        
            }
        } else {
            // console.log(`I have a monster hunt`)
        }
    } catch(e){
        console.log(e)
    }
    
}
