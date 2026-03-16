import convert from "color-convert";
import PaletteSwatch from "./palette-swatch";
import { TrashIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { Swatch } from "@/models/palette";

interface IPaletteSwatchesProps {
  hue: number,
  swatches: Swatch[];
}
export function PaletteSwatches(props: IPaletteSwatchesProps) {
  return (<div className="flex flex-row">
    <AnimatePresence>
    {props.swatches.map((swatch) => {
      // Color math, generate shades from columns based on lightness and chroma equation
      // const l = (1000-swatch.value)/1000;
      // const base = 0.1;
      // const c = base + Math.sin((1-l) * Math.PI) * .1;
      return <PaletteSwatch l={swatch.l} c={swatch.c} h={props.hue} key={swatch.id}></PaletteSwatch>
    }
    )}</AnimatePresence>
  </div>)
}