import { PointerEventHandler, PointerEvent, useRef, useState } from "react";
import { Column } from "./palette-row"
import { EditorColumn } from "./editor-column";
import { clamp } from "colorjs.io/src/util.js";
import { Palette, Swatch } from "@/models/palette";

export type IPaletteEditorProps = {
  palette: Palette;
  updateSwatch: (index: number, value: Swatch) => void;
}

export function PaletteEditor({palette, updateSwatch, ...props}: IPaletteEditorProps) {
  const columnCount = palette.swatches.length;
  const columnWidth = 96;
  const curve = 20;
  const totalWidth = (columnWidth * columnCount) - 1;
  const totalHeight = 140;
  const headerHeight = curve
  const columnHeight = totalHeight - (2 * curve) - headerHeight
  const maxValue = .4;
  // const updateSwatches = (index, swatch) => {
  //   updatePalettes(index,)
  // } 
  
  const [dragIndex, setDragIndex] = useState(-1);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragEnd = (event:  PointerEvent) => {
    console.log(`end ${event.currentTarget}`)
    setDragIndex(-1);
  }
  const getPointerPosition = (event:  PointerEvent) => {
    const CTM = svgRef.current?.getScreenCTM();
    if (!CTM) return {y: 0};
    return {
      y: (event.clientY - CTM.f) / CTM.d
    };
  }
  return <svg ref={svgRef} className="w-full min-w-full" onPointerLeave={dragEnd} onPointerUp={dragEnd}>
    {/* {columns.map((column, index) => {
      const start = width*index;
      const radius = (width/8);
      const xCenter = start + (width/2);
      const colValue = values[index];
      const yPos = colValue * (height-radius);
      const circleRef = useRef<SVGCircleElement | null>(null);
      const rectRef = useRef<SVGRectElement | null>(null);
      const dragStart: PointerEventHandler<SVGCircleElement> = (event) => { 
        console.log("start")
        setDragIndex(index);
      }
      const getPointerPosition = (event:  PointerEvent) => {
        const CTM = svgRef.current?.getScreenCTM();
        if (!CTM) return {y: 0};
        return {
          y: (((event.clientY - CTM.f) / CTM.d) / (rectRef.current?.getBBox().height ?? 0)) * 100
        };
      }
      const drag = (event:  PointerEvent) => {
        if (dragIndex == index) {
          var coord = getPointerPosition(event);
          console.log(`drag ${svgRef.current?.getBBox().height}`)
          updateValues(index,coord.y/(height-radius))
        }
      }
      return <>
        <rect ref={rectRef} key={`${index}rect`} x={`${start}`} y={0} width={`${width}`}  height={`${height}`}  onPointerMove={drag} className="border-l-2"/>
        <path path={`M{}{} `} fill="cyan"/>
        <circle  key={`${index}circle`} ref={circleRef} fill="black" cx={`${xCenter}`} cy={`${yPos}`} r={`${radius}`} onPointerDown={dragStart} onPointerUp={dragEnd} onPointerLeave={() => {}} onPointerMove={drag}/>
      </>
    })} */}
    <path d={`M ${curve},1 L ${totalWidth-curve},1 Q ${totalWidth},1 ${totalWidth},${curve} L ${totalWidth},${totalHeight-curve} Q ${totalWidth},${totalHeight} ${totalWidth-curve},${totalHeight} L ${curve},${totalHeight} Q 1,${totalHeight} 1,${totalHeight-curve} L 1,${curve} Q 1,1 ${curve},1`} stroke="grey"  fill="white" strokeWidth={1} />

    {palette.swatches.map((swatch, index) => {
      let thisColumnWidth = columnWidth;
      let originX = 1 + (index * thisColumnWidth)
      if (index === 0 || index === columnCount-1) {
        thisColumnWidth -= 1
      } 
      if (index !== 0) {
        originX -= 1
      }
      const originY = curve
      const dragStart = (event:  PointerEvent) => { 
        console.log("start")
        setDragIndex(index);
      }
      const drag = (event:  PointerEvent) => {
        if (dragIndex == index) {
          var coord = getPointerPosition(event);
          // console.log(`drag ${svgRef.current?.getBBox().height}`)
          const newValue = ((coord.y - originY - headerHeight)/columnHeight) * maxValue;
          updateSwatch(index, {...swatch, c: clamp(0,newValue,maxValue)})
        }
      }
      return <EditorColumn origin={{x: originX, y: originY}} minValue={0} maxValue={maxValue} allowedRanges={[[0,.4]]}  value={swatch.c} key={swatch.id} drag={drag} dragEnd={dragEnd} dragStart={dragStart} height={columnHeight} headerHeight={headerHeight} width={thisColumnWidth} />
    })}
  </svg>
}