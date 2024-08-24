import { Character } from "alclient";
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

export async function StartMonitoring(){
    const register = new promClient.Registry();
    register.setDefaultLabels({
        app: 'AdventureBot'
    });

    register.registerMetric(gold)
    register.registerMetric(goldpm)
    register.registerMetric(exp)
    
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
    // console.log(char.gold)
    gold.labels(char.name, char.ctype).set(char.gold)
    goldpm.labels(char.name, char.ctype).set(char.goldm)
    exp.labels(char.name, char.ctype).set(char.xp)
}