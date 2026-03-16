import { useSortable } from "@dnd-kit/react/sortable";
import { Activity, useRef, useState } from "react";
import { HueSlider } from "./hue-slider";
import { Button } from "./ui/button";
import { ChevronsDownUpIcon, ChevronUpIcon, GripVertical, SettingsIcon, TrashIcon } from "lucide-react";
import { Input } from "./ui/input";
import { AnimatePresence, motion } from "motion/react";
import { PaletteEditor } from "./palette-editor";
import { Palette } from "../models/palette";
import { PaletteSwatches } from "./palette-swatches";

export interface Column {
  value: number;
  id: string;
}

export type IPaletteRowProps = {
  palette: Palette;
  index: number;
  updatePalettes: (index: number, value: Palette) => void;
  columns: Column[];
  removePalette: (index: number) => void;
}

export function PaletteRow({ palette, index, updatePalettes, columns, removePalette }: IPaletteRowProps) {
  const [element, setElement] = useState<Element | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  useSortable({
    id: palette.id,
    index: index,
    element,
    handle: handleRef,
  });
  return <motion.div ref={setElement} initial={{height: "0"}} animate={{height: "auto"}} exit={{height: "0"}} className="flex flex-row hover-shadow-top-bottom-border sha">
    <div className="self-center w-30 flex flex-row"
    >
      <button className="text-black/50" ref={handleRef}><GripVertical /></button>
      <div className="flex flex-col">
        <Input
          type="text"
          variant="borderless"
          placeholder="Name"
          value={palette.name}
          onChange={(e) => updatePalettes(index, {
            name: e.target.value,
            id: palette.id,
            hue: palette.hue,
            swatches: palette.swatches,
            lightnessCalculation: palette.lightnessCalculation,
            chromaCalculation: palette.chromaCalculation,
          })} />
        <Input
          type="number"
          variant="borderless"
          placeholder="Hue (0-360)"
          max={360}
          min={0}
          value={palette.hue}
          onChange={(e) => updatePalettes(index, {
            name: palette.name,
            id: palette.id,
            hue: !Number.isNaN(Number(e.target.value)) ? Number(e.target.value) : 0,
            swatches: palette.swatches,
            lightnessCalculation: palette.lightnessCalculation,
            chromaCalculation: palette.chromaCalculation,
          })} />
      </div>

      {/* Leaving this out while I work on moving it somewhere more appropriate
        <HueSlider defaultValue={[palette.hue]} onValueChange={(e) => e.values().forEach(value => updatePalettes(index, {
          name: palette.name,
          id: palette.id,
          hue: !Number.isNaN(Number(value)) ? Number(value) : 0
        }))} max={360} min={0} /> */}
    </div>
    <div className="flex flex-col">
      {/* <div className="flex flex-row"> */}
        <PaletteSwatches hue={palette.hue} swatches={palette.swatches} />
      {/* </div> */}
      <AnimatePresence>
        {showConfig && <motion.div initial={{height: 0}} animate={{height:"auto"}} exit={{height: 0}} className="overflow-hidden" >
          Palette Config <br />
          <PaletteEditor palette={palette} updateSwatch={(swatchIndex, swatch) => {
            const nextSwatches = palette.swatches.map((s, i) => {
              if (i != swatchIndex) return s;
              return swatch;
            })
            const newPalette = {...palette, swatches: nextSwatches}
            updatePalettes(index, newPalette);
            }}/>
        </motion.div>}
      </AnimatePresence>
      {/* <Activity mode={showConfig ? "visible" : "hidden"}>
      </Activity> */}
    </div>
    <div className="self-center w-10 transition-all">
      <Button variant="destructive" onClick={(e) => removePalette(index)}><TrashIcon /></Button>
      <Button variant="secondary" onClick={(e) => setShowConfig(!showConfig)}>{showConfig ? <ChevronsDownUpIcon /> : <SettingsIcon />}</Button>
    </div>

  </motion.div>;
}