export default function CostBadge({ cost }: { cost: number }) {
  return (
    <span className="inline-flex items-center bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
      ${cost.toFixed(2)}/serving
    </span>
  );
}
