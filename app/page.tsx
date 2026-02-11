'use client'
import { PaletteRow } from "@/components/palette-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SettingsIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface Palette {
  name: string;
  hue: number;
}

export default function Home() {
  const [palettes, setPalettes] = useState<Palette[]>([{ name: 'neutral', hue: 240 }]);
  const [columnCount, setColumnCount] = useState(10);
  const [columns, setColumns] = useState([100,200,300,400,500,600,700,800,900]);

  function updatePalettes(index: number, value: Palette) {
    const nextPalettes = palettes.map((p, i) => {
      if (i != index) return p;
      return value;
    })
    setPalettes(nextPalettes);
  }
  function addNewPalette(name: string, hue: number) {
    setPalettes([...palettes, { name, hue }])
  }
  function removePalette(index: number) {
    setPalettes(palettes.filter((_, i) => i != index));
  }
  function updateColumns(index: number, value: number) {
    const nextColumns = columns.map((p, i) => {
      if (i != index) return p;
      return Number(value);
    })
    setColumns(nextColumns);
  }
  function addNewColumn(value: number) {
    setColumns([value, ...columns])
  }
  function removeColumn(index: number) {
    setPalettes(palettes.filter((_, i) => i != index));
  }
  return (
    <div className="justify-center flex pl-1 pr-1">
      <div className="flex flex-col">
        <span className="text-6xl self-center">Zoe's Palette Generator</span>
        <div className="flex flex-row pb-1 pt-1">
          <div className="w-50 flex flex-row justify-end pl-0.5 pr-0.5">
            <Button onClick={(e) => addNewColumn(0)}><PlusIcon></PlusIcon></Button>
          </div>
          {columns.map((column, i) => {
            return <div className="flex w-24 justify-center border-r-2"> 
                <Input className="w-18" 
                value={column} 
                key={i} 
                type="number" 
                max="1000" min="0"
                onChange={(e) => updateColumns(i, !Number.isNaN(Number(e.target.value)) ? Number(e.target.value) : 100)}></Input>
              </div>
          })
          }
        </div>
        <div className="flex flex-col pb-1 pt-1">
          {palettes.map((palette, i) =>
            <div className="flex flex-row" key={i}>
              <div className="self-center w-50">
                <Input
                  type="text"
                  placeholder="Name"
                  value={palette.name}
                  onChange={(e) => updatePalettes(i, {
                    name: e.target.value,
                    hue: palette.hue
                  })}
                />
                <Input
                  type="number"
                  placeholder="Hue (0-360)"
                  max={360}
                  min={0}
                  value={palette.hue}
                  onChange={(e) => updatePalettes(i, {
                    name: palette.name,
                    hue: !Number.isNaN(Number(e.target.value)) ? Number(e.target.value) : 0
                  })}
                />
              </div>
              <PaletteRow hue={palette.hue} columns={columns} />
              <div className="self-center w-10">
                <Button variant="destructive" onClick={(e) => removePalette(i)} ><TrashIcon/></Button>
                <Button variant="secondary"><SettingsIcon/></Button>
              </div>
            </div>
          )}
        </div>
        <div className="pb-1 pt-1">
          <Button className="w-35" onClick={(e) => addNewPalette("test", 240)} ><PlusIcon/> Add Palette</Button>
        </div>
      </div>
    </div>
  );
}