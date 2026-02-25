import { memo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useSortable } from "@dnd-kit/react/sortable";
import { GripHorizontal } from "lucide-react";

export type IHeaderProps = {
  column: Column;
  index: number;
  updateColumns: (index: number, value: number) => void;
}

interface Column {
  value: number;
  id: string;
}
export const Header = memo(function HeaderSortable({column, index, updateColumns}: IHeaderProps) {
  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  useSortable({
    id: column.id,
    index,
    element,
    handle: handleRef,
  });
  return <div ref={setElement} className="flex flex-col w-24 justify-center items-center hover:border-r-2 hover:border-l-2">
    <button className="text-black/50" ref={handleRef}><GripHorizontal/></button>
    <Input className="w-15 no-spinner-buttons text-center"
      value={column.value}
      type="number"
      variant="borderless"
      max="1000" min="0"
      onChange={(e) => updateColumns(index, !Number.isNaN(Number(e.target.value)) ? Number(e.target.value) : 100)}></Input>
  </div>
});