import { ServerIdentifier, ServerRegion } from "alclient";

export interface ServerConfig {
    Area: ServerRegion;
    des: ServerIdentifier;
  }
  
export interface CharacterConfig {
    name: string;
    type: string;
    monsterhunt: boolean;
    login: boolean;
  }
  
export interface Config {
    server: ServerConfig;
    characters: CharacterConfig[];
    monsterList: string[];
  }
  