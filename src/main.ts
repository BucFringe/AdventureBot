import AL from "alclient"
import { ReadConfig } from "./domain/configRead.js"
import { login, startLoop } from "./utils/login.js"


async function run() {
    // Reading the config file
    let config = ReadConfig()
    if(!config) {
        process.exit()
    }

    await Promise.all([AL.Game.loginJSONFile("./credentials.json"), AL.Game.getGData()])
    await AL.Pathfinder.prepare(AL.Game.G)

    //Logging in character number one
    if(config.characters[0]){
        let charOne = await login(config.characters[0],config.server)
        // we would now start the merchant loop
        if(charOne) {
            startLoop(config.characters[0],charOne)
        }
    }
    if(config.characters[1]){
        let chartwo = await login(config.characters[1],config.server)
        if(chartwo) {
            startLoop(config.characters[1],chartwo)
        }
    }
    if(config.characters[2]){
        let charthree= await login(config.characters[2],config.server)
        if(charthree) startLoop(config.characters[2],charthree)
    }
    if(config.characters[3]){
        let charFour = await login(config.characters[3], config.server)
        if(charFour) startLoop(config.characters[3], charFour)
    }


    // // Log the characters into the game
    // const vendi = await AL.Game.startMerchant('Vendi','EU','II')
    // // const sildo = await AL.Game.startPaladin('Sildo', 'EU', 'I')
    // const ataki = await AL.Game.startWarrior('Ataki', 'EU', 'II')
    // const magio = await AL.Game.startMage('Magio', "EU", "II")
    // const resanigi = await AL.Game.startPriest('Resanigi', 'EU', 'II')

    // // Create a party
    // await AddPartyMember("Vendi", "Ataki")
    // await AddPartyMember("Vendi", "Resanigi")
    // await AddPartyMember("Vendi", "Magio")

    // // await Revive(vendi)
    // // await Revive(ataki)
    // // await Revive(resanigi)
    // // await Revive(magio)

    // WarriorLoop(ataki)
    // PriestLoop(resanigi)
    // MageLoop(magio)

}


run()
