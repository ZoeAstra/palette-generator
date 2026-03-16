import { PointerEvent } from "react";
import { Point } from "@/models/point"

export type IEditorColumnProps = {
    origin: Point;
    value: number;
    drag: (event: PointerEvent) => void;
    dragStart: (event: PointerEvent) => void;
    dragEnd: (event: PointerEvent) => void;
    minValue: number;
    maxValue: number;
    allowedRanges: [number[]];
    width: number;
    height: number;
    headerHeight: number;
}

export function EditorColumn({origin, value, minValue, maxValue, width, height, drag, dragStart, dragEnd, headerHeight, ...props}: IEditorColumnProps) {
    const cx = origin.x + (width/2);
    const yPos = ((value/maxValue) * height) + origin.y + headerHeight;
    return <>
        <rect x={origin.x} y={origin.y} width={width}  height={headerHeight} fill="white" stroke="grey" className="border-l-2"/>
        <rect x={origin.x} y={origin.y + headerHeight} width={width}  height={height} fill="white" stroke="grey" onPointerMove={drag} className="border-l-2"/>
        <circle fill="black" cx={cx} cy={`${yPos}`} r={headerHeight/2} onPointerDown={dragStart} onPointerUp={dragEnd} onPointerMove={drag}/>
    </>
}