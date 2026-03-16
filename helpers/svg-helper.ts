import { Point } from "@/models/point";

export class SVGHelper {
    static AddPoints(a: Point, b: Point): Point {
        return {
            x: a.x + b.x,
            y: a.y + b.y
        }
    }

    static ToPercentString(percent: number): string {
        return `${percent}%`
    }
}