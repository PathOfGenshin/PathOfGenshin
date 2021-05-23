export interface StatCurve {
    curveId: string;
    level: number;
    value: number;
    arith: string;
}

export interface PropCurve {
    propType: string;
    curveId: string;
    initialValue: number | null;
}
