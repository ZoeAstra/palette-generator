export type Palette = {
    id: string;
    name: string;
    swatches: Swatch[];
    hue: number;
    lightnessCalculation: Calculation;
    chromaCalculation: Calculation;
}

export type Swatch = {
    id: string;
    l: number;
    c: number;
}

export type Calculation = {
    type: "manual" | "sine"; // add "Bezier" in the future
    calculate?: (value: number) => number;
}
