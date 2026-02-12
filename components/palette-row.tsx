import convert from "color-convert";
import PaletteSwatch from "./palette-swatch";
import { TrashIcon } from "lucide-react";

interface IPaletteProps {
  hue: number,
  columns: number[],
}
export function PaletteRow(props: IPaletteProps) {
  return (<div className="flex flex-row">
    {props.columns.map((col, i) => {
      const l = (1000-col)/1000;
      const base = 0.1;
      const c = base + Math.sin((1-l) * Math.PI) * .1;
      // const color = `oklch(${l}% ${} ${})`;
      // console.log(props.hue)
      // return <span key={i} className="p-4" style={{ 
      //   backgroundColor: color,
      //   color: l < 50 ? "black" : "white"
      //   }}>
      //   {l * 10}
      // </span>;
      return <PaletteSwatch l={l} c={c} h={props.hue} key={i}></PaletteSwatch>
    }
    )}
  </div>)
}