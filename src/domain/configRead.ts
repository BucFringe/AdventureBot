import fs from "fs"
import { Config } from "./configInterface.js";


const configPath = 'C:/Users/Elliott/Documents/coding/home/AdventureBot/src/config.json'

export function ReadConfig(){
    try {
        const rawData = fs.readFileSync(configPath);
        const config: Config = JSON.parse(rawData.toString())
        return config
    } catch(e) {
        console.log(`Error in Reading Config file ${e}`)
        return false
    }
}

