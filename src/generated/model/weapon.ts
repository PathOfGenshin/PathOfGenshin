import { Ascension } from "./ascension"
import { PropCurve } from "./stat_curves"

export enum WeaponType {
    WEAPON_SWORD_ONE_HAND = "WEAPON_SWORD_ONE_HAND",
    WEAPON_CLAYMORE = "WEAPON_CLAYMORE",
    WEAPON_POLE = "WEAPON_POLE",
    WEAPON_CATALYST = "WEAPON_CATALYST",
    WEAPON_BOW = "WEAPON_BOW",
}

export interface WeaponInfo {
    id: number;
    name: string;
    weaponType: WeaponType;
    quality: number;
    description: string;
    icon: string;
    iconAwakened: string;
}

export interface Weapon {
    baseInfo: WeaponInfo;
    props: PropCurve[];
    ascensions: Ascension[];
    affixes: number[];
}
