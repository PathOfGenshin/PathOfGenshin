import { PropBonus } from "./prop";

export interface Affix {
    id: number;
    configName: string;
    level: number;
    format: string;
    params: number[];
    staticParams: number[];
    props: PropBonus[];
}

export interface AffixGroup {
    id: number;
    name: string;
    affixes: Affix[];
}
