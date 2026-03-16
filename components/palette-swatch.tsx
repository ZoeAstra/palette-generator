import { motion } from "motion/react";
import { useEffect, useState } from "react";

export interface IPaletteSwatchProps {
  l: number;
  c: number;
  h: number;
  label?: string;
}

export default function PaletteSwatch(props: IPaletteSwatchProps) {
  const color = `oklch(${props.l * 100}% ${props.c} ${props.h})`;
  const [className, setClassName] = useState(`w-24 h-24 flex flex-col hover:text-white text-black/0`)
  useEffect(() => {
    if (props.l > .60) {
      setClassName(`h-24 flex flex-col hover:text-black text-black/0`)
    } 
    else {
      setClassName(`h-24 flex flex-col hover:text-white text-white/0`)
    }
  }, [props.l])
  return (
    <motion.span initial={{width: "0"}} animate={{width: "calc(var(--spacing) * 24)"}} exit={{width: "0"}} className={className} style={{
      backgroundColor: color,
      fontSize: 12,
    }}
    >
      <span>L: {(props.l * 100).toFixed(2)}%</span>
      <span>C: {props.c.toFixed(3)}</span>
      <span>H: {props.h}</span>
    </motion.span>
  )
}