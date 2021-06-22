import { CharacterConstellation, CharacterPassive, CharacterSkill } from "./character_skills";
import { StarQuality } from "./type_aliases";
import { WeaponType } from "./weapon";
import { PropCurve } from "./stat_curves";
import { Ascension } from "./ascension";

export enum VisionType {
    None = "None",
    Pyro = "Pyro",
    Cryo = "Cryo",
    Electro = "Electro",
    Hydro = "Hydro",
    Geo = "Geo",
    Anemo = "Anemo",
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

export interface CharacterSkillDepot {
    id: number;
    skills: CharacterSkill[];
    element: VisionType;
    constellations: CharacterConstellation[];
    passives: CharacterPassive[];
}

export interface Character {
    id: number;
    name: string;
    quality: StarQuality;
    weaponType: WeaponType;
    icon: string;
    sideIcon: string;
    metadata: CharacterMetadata;
    baseStats: CharacterBaseStats;
    props: PropCurve[];
    skillDepotIds: number[];
    ascensions: Ascension[];
}
