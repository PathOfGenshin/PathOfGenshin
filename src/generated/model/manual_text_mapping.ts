export enum TextMappingType {
    FIGHT_PROP = 0,
    ARTIFACT_TYPE = 1,
    WEAPON_TYPE = 2,
}

export interface ManualTextMapping {
    key: string;
    value: string;
    type: TextMappingType;
}
