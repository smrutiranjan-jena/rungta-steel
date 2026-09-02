interface BlueprintTicksProps {
  count?: number;
  className?: string;
}

// Blueprint-style tick ruler — reused wherever we want the "precision /
// engineering drawing" motif (login brand panel, sidebar footer, etc).
export default function BlueprintTicks({ count = 20, className = "" }: BlueprintTicksProps) {
  const ticks = Array.from({ length: count });
  return (
    <div className={`flex flex-col items-end gap-[9px] ${className}`}>
      {ticks.map((_, i) => (
        <div
          key={i}
          className="h-px bg-primary-300"
          style={{ width: i % 4 === 0 ? "22px" : "10px" }}
        />
      ))}
    </div>
  );
}