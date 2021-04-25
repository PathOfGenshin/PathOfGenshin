export interface StatCurve {
    level: number;
    value: number;
    arith: string;
}

export interface StatCurves {
    character: Record<string, StatCurve[]>;
    weapon: Record<string, StatCurve[]>;
}

export interface PropCurve {
    propType: string;
    curveId: string;
    initialValue: number | null;
}
