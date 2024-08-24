import { Game, Merchant } from "alclient";
import { Revive } from "../utils/healing.js";
import { CharacterConfig } from "../domain/configInterface.js";
import { ReadConfig } from "../domain/configRead.js";


export async function MerchantLoop(mer: Merchant){
        if(mer.rip) Revive(mer);
        let config = ReadConfig()
        if(!config) {
            process.exit()
        }
        console.log(Game.characters)
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