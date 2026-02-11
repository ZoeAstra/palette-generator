export interface IPaletteSwatchProps {
  l: number;
  c: number;
  h: number;
  label?: string;
}

export default function PaletteSwatch(props: IPaletteSwatchProps) {
  const color = `oklch(${props.l * 100}% ${props.c} ${props.h})`;
  return (
    <span className="w-24 h-24" style={{
      backgroundColor: color,
      color: props.l > 50 ? "black" : "white"
    }}
    >
      {props.label}
    </span>
  )
}