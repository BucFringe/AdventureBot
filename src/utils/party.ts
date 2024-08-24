import { Character } from "alclient";

// export async function AddPartyMember(main: Character, add: string){
//     await main.sendPartyInvite(add)
//     console.log(`Sent party Invite to ${add}`)
//     await new Promise(resolve => setTimeout(resolve, 200));
//     await add.acceptPartyInvite(main.id)
    
// }


export async function PartyCreateFull(main: Character, char1: Character, char2?:Character, char3?:Character){
    if (!main.party){
        console.log(`Creating Party with ${main.name} as the party leader`)
        await main.sendPartyInvite(char1.id)
        console.log(`Sent party Invite to ${char1.name}`)
        await new Promise(resolve => setTimeout(resolve, 200));
        if (char2){
            await main.sendPartyInvite(char2.id)
            console.log(`Sent party Invite to ${char2.name}`)
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        if (char3){
            await main.sendPartyInvite(char3.id)
            console.log(`Sent party Invite to ${char3.name}`)
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        await char1.acceptPartyInvite(main.id)
        await new Promise(resolve => setTimeout(resolve, 200));
        if (char2){
            await char2.sendPartyInvite(main.id)
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        if (char3){
            await char3.sendPartyInvite(main.id)
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        // console.debug(main.partyData)
    }
}