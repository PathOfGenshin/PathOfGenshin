export interface SkillParam {
    name: string;
    format: string;
    values: Record<string, number>;
}

export interface SkillLevel {
    level: number;
    params: SkillParam[];
}

export interface CharacterSkill {
    id: number;
    name: string;
    description: string;
    type: string;
    icon: string;
    levels: SkillLevel[];
}

export interface PassiveParam {
    target: string;
    value: number;
}

export interface CharacterPassive {
    groupId: number;
    name: string;
    description: string;
    requiredAscensionLevel: number;
    format: string;
    params: PassiveParam[];
    icon: string;
}

export interface CharacterConstellation {
    id: number;
    level: number;
    name: string;
    description: string;
    params: number[];
    icon: string;
}
