'use client'
import { Header } from "@/components/header";
import { HueSlider } from "@/components/hue-slider";
import { PaletteRow, Column } from "@/components/palette-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Palette, Swatch, Calculation } from "@/models/palette";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { PlusIcon, SettingsIcon, TrashIcon } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useRef, useState } from "react";


export default function Home() {
  const manualCalculation: Calculation = {
    type: "manual",
  };
  const startingValues = [{l:.9,}]
  const [palettes, setPalettes] = useState<Palette[]>([
    { name: 'blue', id: crypto.randomUUID(), hue: 240, swatches: [
      {id: crypto.randomUUID(), l: .9, c: .131},
      {id: crypto.randomUUID(), l: .8, c: .159},
      {id: crypto.randomUUID(), l: .7, c: .181},
      {id: crypto.randomUUID(), l: .6, c: .195},
      {id: crypto.randomUUID(), l: .5, c: .200},
      {id: crypto.randomUUID(), l: .4, c: .195},
      {id: crypto.randomUUID(), l: .3, c: .181},
      {id: crypto.randomUUID(), l: .2, c: .159},
      {id: crypto.randomUUID(), l: .1, c: .131}], 
      lightnessCalculation: manualCalculation, chromaCalculation: manualCalculation }, 
    { name: 'red', id: crypto.randomUUID(), hue: 20, swatches: [
      {id: crypto.randomUUID(), l: .9, c: .131},
      {id: crypto.randomUUID(), l: .8, c: .159},
      {id: crypto.randomUUID(), l: .7, c: .181},
      {id: crypto.randomUUID(), l: .6, c: .195},
      {id: crypto.randomUUID(), l: .5, c: .200},
      {id: crypto.randomUUID(), l: .4, c: .195},
      {id: crypto.randomUUID(), l: .3, c: .181},
      {id: crypto.randomUUID(), l: .2, c: .159},
      {id: crypto.randomUUID(), l: .1, c: .131}],
      lightnessCalculation: manualCalculation, chromaCalculation: manualCalculation }, 
    { name: 'green', id: crypto.randomUUID(), hue: 140, swatches: [
      {id: crypto.randomUUID(), l: .9, c: .131},
      {id: crypto.randomUUID(), l: .8, c: .159},
      {id: crypto.randomUUID(), l: .7, c: .181},
      {id: crypto.randomUUID(), l: .6, c: .195},
      {id: crypto.randomUUID(), l: .5, c: .200},
      {id: crypto.randomUUID(), l: .4, c: .195},
      {id: crypto.randomUUID(), l: .3, c: .181},
      {id: crypto.randomUUID(), l: .2, c: .159},
      {id: crypto.randomUUID(), l: .1, c: .131}],
      lightnessCalculation: manualCalculation, chromaCalculation: manualCalculation }
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

  // can't be deterministically calculated based on inputs, as it may be manual. This will likely need custom handling in the handlers themselves
  // useEffect(() => {
  //   const nextPalettes = palettes.map((palette) => {
  //     const step = 
  //     return {
  //       swatches: columns.map((col) => {id: crypto.randomUUID(), l: palette.lightnessCalculation() })
  //     } as Palette;
  //   })
  // },[columns])


  function updatePalettes(index: number, value: Palette) {
    const nextPalettes = palettes.map((p, i) => {
      if (i != index) return p;
      return value;
    })
    setPalettes(nextPalettes);
  }
  function addNewPalette(name: string, hue: number) {
    setPalettes([...palettes, { name, id: crypto.randomUUID(), hue, swatches: [
      {id: crypto.randomUUID(), l: .9, c: .131},
      {id: crypto.randomUUID(), l: .8, c: .159},
      {id: crypto.randomUUID(), l: .7, c: .181},
      {id: crypto.randomUUID(), l: .6, c: .195},
      {id: crypto.randomUUID(), l: .5, c: .200},
      {id: crypto.randomUUID(), l: .4, c: .195},
      {id: crypto.randomUUID(), l: .3, c: .181},
      {id: crypto.randomUUID(), l: .2, c: .159},
      {id: crypto.randomUUID(), l: .1, c: .131}],
      lightnessCalculation: manualCalculation, chromaCalculation: manualCalculation }])
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
        <span className="text-6xl self-center">Palette Generator</span>
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
          
          <DragDropProvider><AnimatePresence>
          {palettes.map((palette, i) => {
            return <PaletteRow key={palette.id} palette={palette} index={i} updatePalettes={updatePalettes} columns={columns} removePalette={removePalette} />;
            }
          )}
          </AnimatePresence></DragDropProvider>
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


