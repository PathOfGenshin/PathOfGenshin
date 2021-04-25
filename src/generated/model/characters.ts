import { Ascension } from "./ascension"
import {
  CharacterConstellation,
  CharacterPassive,
  CharacterSkill,
} from "./character_skills"
import { PropCurve } from "./stat_curves"

export enum VisionType {
    Anemo = "Anemo",
    None = "None",
    Electro = "Electro",
    Hydro = "Hydro",
    Cryo = "Cryo",
    Pyro = "Pyro",
    Geo = "Geo",
}

export interface CharacterMetadata {
    availableSince: string;
    cvChinese: string;
    cvJapanese: string;
    cvKorean: string;
    cvEnglish: string;
    birthMonth: number;
    birthDay: number;
    affiliation: string;
    vision: VisionType;
    constellation: string;
    description: string;
    title: string;
}

export interface CharacterBaseStats {
    health: number;
    attack: number;
    defence: number;
    criticalRate: number;
    criticalDamage: number;
}

export interface CharacterAssets {
    icon: string;
    sideIcon: string;
    constellations: string[];
    passives: string[];
    skillAuto: string;
    skillElemental: string;
    skillBurst: string;
}

export interface CharacterInfo {
    id: number;
    name: string;
    quality: number;
    element: string;
    weaponType: string;
    icon: string;
    sideIcon: string;
}

export interface CharacterSkillDepot {
    id: number;
    skills: CharacterSkill[];
    constellations: CharacterConstellation[];
    passives: CharacterPassive[];
}

export interface Character {
    baseInfo: CharacterInfo;
    metadata: CharacterMetadata;
    baseStats: CharacterBaseStats;
    props: PropCurve[];
    skillDepots: CharacterSkillDepot[];
    ascensions: Ascension[];
}
