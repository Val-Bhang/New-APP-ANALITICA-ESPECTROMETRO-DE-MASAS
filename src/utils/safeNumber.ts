/**
 * Utility function to validate and clamp numeric inputs within a safe range [min, max].
 * If the parsed value is NaN or invalid, it safely falls back to min.
 */
export function clampNumber(value: unknown, min: number, max: number): number {
  const num = typeof value === 'number' ? value : Number(value);
  if (isNaN(num)) {
    return min;
  }
  return Math.min(Math.max(num, min), max);
}
