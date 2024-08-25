import { Game, Merchant } from "alclient";
import { Revive } from "../utils/healing.js";
import { CharacterConfig } from "../domain/configInterface.js";
import { ReadConfig } from "../domain/configRead.js";
import { CharacterMonitoring } from "../monitoring.js";


export async function MerchantLoop(mer: Merchant){
        if(mer.rip) Revive(mer);
        let config = ReadConfig()
        if(!config) {
            process.exit()
        }
        setInterval(() => {
            CharacterMonitoring(mer)
        }, 500);
        // console.log(Game.characters)
//         for(const char of config.characters){
//             let party = mer.partyData
//             console.log(party)
//             console.log(`Sending the Invites out`)
//             await mer.sendPartyInvite(char.name)
//             console.log(`Sent party Invite to ${char.name}`)
//             await new Promise(resolve => setTimeout(resolve, 5000));
//         }
//         console.log(Game.characters)
}