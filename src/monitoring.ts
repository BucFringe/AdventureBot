import { Character, ItemData, ItemName, SlotInfo } from "alclient";
import promClient, { collectDefaultMetrics, Counter, Gauge, Registry } from "prom-client";
import express from 'express'

export const gold = new Gauge({
    name: 'gold',
    help: 'Characters Gold',
    labelNames: ['characterName', 'class']
})

export const goldpm = new Gauge({
    name: 'gold_per_min',
    help: 'Gold Per Min',
    labelNames: ['characterName', 'class']
})

export const exp = new Gauge({
    name: 'exp',
    help: 'Character exp',
    labelNames: ['characterName', 'class']
})

export const equipedItemLevel = new Gauge({
    name: 'equipted_item_level',
    help: 'Level of all equipted items',
    labelNames: ['characterName', 'ItemName', 'class']
})

export async function StartMonitoring(){
    const register = new promClient.Registry();
    register.setDefaultLabels({
        app: 'AdventureBot'
    });

    register.registerMetric(gold)
    register.registerMetric(goldpm)
    register.registerMetric(exp)
    register.registerMetric(equipedItemLevel)
    
    // collectDefaultMetrics({ register: register })
    
    const app = express()
    
    app.get('/health', (req, res) => {
        res.send('ok')
    })
    app.get('/metrtics', async (req, res) => {
        const result = await register.metrics()
        res.send(result)
    })
    
    app.listen(3000, () => {
        console.log('Prometheus endpoint on 0.0.0.0:3000')
    })   
}


export function CharacterMonitoring(char : Character) {
    // console.log(`${char.name} is sending metrics`)
    gold.labels(char.name, char.ctype).set(char.gold)
    goldpm.labels(char.name, char.ctype).set(char.goldm)
    exp.labels(char.name, char.ctype).set(char.xp)
    
}

export function EquipMonitoring(char: Character) {
    if (char.slots.ring1) sendEquipMonitoring(char, char.slots.ring1)
    if (char.slots.ring2) sendEquipMonitoring(char, char.slots.ring2)
    if (char.slots.earring1) sendEquipMonitoring(char, char.slots.earring1)
    if (char.slots.earring2) sendEquipMonitoring(char, char.slots.earring2)
    if (char.slots.belt) sendEquipMonitoring(char, char.slots.belt)
    if (char.slots.mainhand) sendEquipMonitoring(char, char.slots.mainhand)
    if (char.slots.offhand) sendEquipMonitoring(char, char.slots.offhand)
    if (char.slots.helmet) sendEquipMonitoring(char, char.slots.helmet)
    if (char.slots.chest) sendEquipMonitoring(char, char.slots.chest)
    if (char.slots.pants) sendEquipMonitoring(char, char.slots.pants)
    if (char.slots.shoes) sendEquipMonitoring(char, char.slots.shoes)
    if (char.slots.gloves) sendEquipMonitoring(char, char.slots.gloves)
    if (char.slots.amulet) sendEquipMonitoring(char, char.slots.amulet)
    if (char.slots.orb) sendEquipMonitoring(char, char.slots.orb)
    if (char.slots.elixir) sendEquipMonitoring(char, char.slots.elixir)
    if (char.slots.cape) sendEquipMonitoring(char, char.slots.cape)
}

function sendEquipMonitoring(char: Character, item: ItemData){
    if(item.level) equipedItemLevel.labels(char.name, item.name, char.ctype).set(item.level)
}
