'use client'
import { Header } from "@/components/header";
import { HueSlider } from "@/components/hue-slider";
import { Column, Palette, PaletteRow } from "@/components/palette-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { PlusIcon, SettingsIcon, TrashIcon } from "lucide-react";
import { useRef, useState } from "react";



export default function Home() {
  const [palettes, setPalettes] = useState<Palette[]>([{ name: 'blue', id: crypto.randomUUID(), hue: 240 }, 
    { name: 'red', id: crypto.randomUUID(), hue: 20 }, 
    { name: 'green', id: crypto.randomUUID(), hue: 140 }
  ]);
  const [columns, setColumns] = useState<Column[]>([{value:100, id: crypto.randomUUID()},
    {value:200, id: crypto.randomUUID()},
    {value:300, id: crypto.randomUUID()},
    {value:400, id: crypto.randomUUID()},
    {value:500, id: crypto.randomUUID()},
    {value:600, id: crypto.randomUUID()},
    {value:700, id: crypto.randomUUID()},
    {value:800, id: crypto.randomUUID()},
    {value:900, id: crypto.randomUUID()}
  ]);


  function updatePalettes(index: number, value: Palette) {
    const nextPalettes = palettes.map((p, i) => {
      if (i != index) return p;
      return value;
    })
    setPalettes(nextPalettes);
  }
  function addNewPalette(name: string, hue: number) {
    setPalettes([...palettes, { name, id: crypto.randomUUID(), hue }])
  }
  function removePalette(index: number) {
    setPalettes(palettes.filter((_, i) => i != index));
  }
  function updateColumns(index: number, value: number) {
    const nextColumns = columns.map((c, i) => {
      if (i != index) return c;
      return {value: Number(value), id: c.id};
    })
    setColumns(nextColumns);
  }
  function addNewColumn(value: number) {
    setColumns([{value, id: crypto.randomUUID()}, ...columns])
  }
  function removeColumn(index: number) {
    setColumns(columns.filter((_, i) => i != index));
  }
  return (
    <div className="justify-center flex pl-1 pr-1" >
      <div className="flex flex-col">
        <span className="text-6xl self-center">Zoe's Palette Generator</span>
        <div className="flex flex-row pb-1 pt-1">
          <div className="w-30 flex hover flex-row justify-end pl-0.5 pr-0.5">
            <Button onClick={(e) => addNewColumn(0)}><PlusIcon/> Add Column</Button>
          </div>
          <DragDropProvider 
            onDragOver={(event) => {
              setColumns((items) => move(items, event));
            }}
            onDragEnd={(event) => {
              setColumns((items) => move(items, event));
            }}
            >
            {columns.map((column, i) => {
              return <Header key={column.id} column={column} index={i} updateColumns={updateColumns}/>
            })
            }
          </DragDropProvider>
        </div>
        <div className="flex flex-col pb-1 pt-1">
          <DragDropProvider>
          {palettes.map((palette, i) => {
            return <PaletteRow key={palette.id} palette={palette} index={i} updatePalettes={updatePalettes} columns={columns} removePalette={removePalette} />;
            }
          )}
          </DragDropProvider>
        </div>
        <div className="flex flex-row pb-1 pt-1">
          <div className="w-30 flex hover flex-row justify-end pl-0.5 pr-0.5">
            <Button className="w-35" onClick={(e) => addNewPalette("test", 240)} ><PlusIcon/> Add Palette</Button>
          </div>
          {columns.map((column, i) => {
            return <div className="flex w-24 justify-center hover:border-r-2 hover:border-l-2 text-black/5 hover:text-black/15" key={i}> 
                <Button className="hover:text-destructive" variant="ghost" onClick={(e) => removeColumn(i)} ><TrashIcon/></Button>
              </div>
          })}
        </div>
      </div>
    </div>
  );
}


