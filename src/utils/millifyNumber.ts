const formatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

export function shortenNumber(num: number) {
  return formatter.format(num);
}

export function shortenRange([first, second]: [number, number]) {
  return `${shortenNumber(first)}-${shortenNumber(second)}`;
}
