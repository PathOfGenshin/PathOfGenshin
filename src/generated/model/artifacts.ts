export enum ArtifactType {
    EQUIP_BRACER = "EQUIP_BRACER",
    EQUIP_NECKLACE = "EQUIP_NECKLACE",
    EQUIP_SHOES = "EQUIP_SHOES",
    EQUIP_RING = "EQUIP_RING",
    EQUIP_DRESS = "EQUIP_DRESS",
}

export interface Artifact {
    id: number;
    name: string;
    type: ArtifactType;
    description: string;
    icon: string;
}

export interface ArtifactSet {
    id: number;
    icon: string;
    name: string;
    affixes: number[];
    artifacts: Artifact[];
}
