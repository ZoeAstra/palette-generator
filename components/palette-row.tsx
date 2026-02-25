import { useSortable } from "@dnd-kit/react/sortable";
import { useRef, useState } from "react";
import { HueSlider } from "./hue-slider";
import { Palette } from "./palette";
import { Button } from "./ui/button";
import { GripVertical, SettingsIcon, TrashIcon } from "lucide-react";
import { Input } from "./ui/input";

export interface Palette {
  name: string;
  id: string;
  hue: number;
}

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

export function PaletteRow({palette, index, updatePalettes, columns, removePalette}: IPaletteRowProps) {
  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  useSortable({
    id: palette.id,
    index: index,
    element,
    handle: handleRef,
  });
  return <div ref={setElement} className="flex flex-row">
    <div className="self-center w-30 flex flex-row"
    >
      <button className="text-black/50" ref={handleRef}><GripVertical/></button>
      <div className="flex flex-col">
        <Input
          type="text"
          variant="borderless"
          placeholder="Name"
          value={palette.name}
          onChange={(e) => updatePalettes(index, {
            name: e.target.value,
            id: palette.id,
            hue: palette.hue
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
            hue: !Number.isNaN(Number(e.target.value)) ? Number(e.target.value) : 0
          })} />
      </div>
      
      {/* Leaving this out while I work on moving it somewhere more appropriate
      <HueSlider defaultValue={[palette.hue]} onValueChange={(e) => e.values().forEach(value => updatePalettes(index, {
        name: palette.name,
        id: palette.id,
        hue: !Number.isNaN(Number(value)) ? Number(value) : 0
      }))} max={360} min={0} /> */}
    </div>
    <Palette hue={palette.hue} columns={columns.map(c => c.value)} />
    <div className="self-center w-10">
      <Button variant="destructive" onClick={(e) => removePalette(index)}><TrashIcon /></Button>
      {/* <Button variant="secondary"><SettingsIcon /></Button> */}
    </div>
  </div>;
}