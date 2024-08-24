import { Character } from "alclient";


export function logger(level: String, log: string, char?: Character) {
    if (char){
        console.log(`${Date.UTC} - ${char.name} - ${level} - ${log}`)
    }
    else {
        console.log(`${Date.UTC} - ${level} - ${log}`)
    }
}