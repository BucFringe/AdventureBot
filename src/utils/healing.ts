import { Character } from "alclient";

export async function Revive(char: Character) {
    if (char.rip){
        await char.respawn()
    }
}