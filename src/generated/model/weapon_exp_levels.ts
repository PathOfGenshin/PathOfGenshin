export interface WeaponExpLevel {
    level: number;
    expToNextLevel: number;
    cumulativeExp: number;
}

export interface WeaponExpLevels {
    levels: Record<string, WeaponExpLevel[]>;
}
