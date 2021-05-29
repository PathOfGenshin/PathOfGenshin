export enum SkillType {
    Normal = "Normal",
    Skill = "Skill",
    Burst = "Burst",
    AlternateSprint = "AlternateSprint",
}

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
    type: SkillType;
    icon: string;
    energyCost: number | null;
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
