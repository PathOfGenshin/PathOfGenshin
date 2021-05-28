import { StarQuality } from "./type_aliases";
import { PropCurve } from "./stat_curves";
import { Ascension } from "./ascension";

export enum WeaponType {
    WEAPON_SWORD_ONE_HAND = "WEAPON_SWORD_ONE_HAND",
    WEAPON_CLAYMORE = "WEAPON_CLAYMORE",
    WEAPON_POLE = "WEAPON_POLE",
    WEAPON_CATALYST = "WEAPON_CATALYST",
    WEAPON_BOW = "WEAPON_BOW",
}

export interface Weapon {
    id: number;
    name: string;
    weaponType: WeaponType;
    quality: StarQuality;
    description: string;
    icon: string;
    iconAwakened: string;
    props: PropCurve[];
    ascensions: Ascension[];
    affixes: number[];
}
