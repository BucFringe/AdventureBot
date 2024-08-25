import { Character, EntitiesData, MonsterName, Tools } from "alclient";
import { looting } from "./looting.js";

export async function singleAttack(char: Character, mon: MonsterName){
    if(!char.ready) return;
    if(char.rip) return;
    if (char.getTargetEntity()){
        // console.log(`${char.name} - has a target`)
        try{
            // let target = char.getEntity({returnNearest: true, canWalkTo: true, type: mon})
            if (Tools.distance(char, char.getTargetEntity()) > char.range){
                if(!char.moving){
                    await char.smartMove(char.getTargetEntity())
                }
            }
            if (char.isOnCooldown("attack")) return;
            if (char.getTargetEntity()) await char.basicAttack(char.getTargetEntity().id);
        } catch (e){
            // console.log(e)
        }
    } else {
        // console.log(`${char.name} - I dont have a target`)
        const targeted = char.getEntity({ returnNearest: true, type: mon})
        if(!targeted){
            if(!char.smartMoving){
                await char.smartMove(mon)
            }
        } else {
            // console.log (`${char.name} is targeting ${targeted.id}`)
        if (Tools.distance(char, targeted) > char.range){
                try{
                    if(!char.smartMoving){
                        await char.smartMove(targeted)
                    }
                } catch(e){
                    console.log(`${char.name} move - ${e}`)
                }
            } else {
                // Should be in range
                if (!targeted) return;
                if (!char.isOnCooldown('attack')){
                    try{
                        await char.basicAttack(targeted.id)
                    } catch(e){
                        console.log(`${char.name} attack - ${e}`)
                    }
                }   
            }
            await looting(char);
        }
    }
}

export async function oldsingleAttack(bot: Character, monster: MonsterName){
    // Where each bot will attack a different target.
    if(!bot.ready) return;
    const target = bot.getEntity({ returnNearest: true, canWalkTo: true, type: monster, withinRange: "attack"})
    console.log(target)
    if (target){
        if (!bot.isOnCooldown("attack")){
            try{
                await bot.basicAttack(target.id);
            } catch (e) {
                console.warn(e);
            }
        }
    } else {
        try{
            if (!bot.smartMoving){
                await bot.smartMove(monster);
            }
        } catch (e){
            console.warn(e);
        }
    }
    await looting(bot);
}

// export async function getNewTarget(char: Character, mon: MonsterName){
//     return char.getEntity({ canWalkTo: true, type: mon, withinRange: "attack"})

// }

// export async function currentTarget(char: Character){
//     console.log("nothjing")
// }

// export async function newTargetedAttack(char: Character, mon: MonsterName){
//     if (Tools.distance(char, target) > char.range){
//         if(!char.moving){
//             await char.smartMove(mon)
//         }
//     } else {
//         // Should be in range
//         if (!char.isOnCooldown('attack')){
//             await char.basicAttack(mon)
//         } else {
//             console.log(`${char.name} - DAM Out of Reach`)
//         }
//     }
//     await looting(char);
// }

// export async function TargetedAttack(char: Character, mon: MonsterData){
//     if (Tools.distance(char, mon) > char.range){
//         if(!char.moving){
//             await char.smartMove(mon)
//         }
//     } else {
//         // Should be in range
//         if (!char.isOnCooldown('attack')){
//             await char.basicAttack(mon.id)
//         } else {
//             console.log(`${char.name} - DAM Out of Reach`)
//         }
//     }
//     await looting(char);
// }