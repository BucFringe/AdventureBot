import { Game, Merchant } from "alclient";
import { Revive } from "../utils/healing.js";
import { CharacterConfig } from "../domain/configInterface.js";
import { ReadConfig } from "../domain/configRead.js";
import { CharacterMonitoring } from "../monitoring.js";
import { CreateParty } from "../utils/party.js";


export async function MerchantLoop(mer: Merchant){
        if(mer.rip) Revive(mer);
        let config = ReadConfig()
        if(!config) {
            process.exit()
        }
        setInterval(() => {
            CharacterMonitoring(mer)
            CreateParty(mer)
            // console.log(mer.partyData)
        }, 500);
        setInterval(async () => {
            if(!mer.smartMoving){
                mer.smartMove('goo')
            }
        },10000)
}