export function formatMonthYear(iso?: string): string {
  if (!iso) return "Present";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
