// src/lib/b3-engine.ts

/**
 * Returns a random float between 0 (inclusive) and 1 (exclusive).
 * Equivalent to Math.random().
 */
export function nextFloat(): number {
  return Math.random();
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 */
export function nextInt(min: number, max: number): number {
  // Ensure min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns true with a given probability.
 * @param probability Chance of returning true (0.0 to 1.0)
 */
export function chance(probability: number): boolean {
  return Math.random() < probability;
}

/**
 * Selects an item from an array based on weights.
 * Each item in the array must be an object with a 'weight' property (number).
 * @param items Array of items, each with a 'weight' property.
 * @returns The selected item, or null if the input array is empty.
 *          If all positive weights are zero, it selects uniformly from items with non-negative weight.
 */
export function weightedRandom<T extends { weight: number }>(items: T[]): T | null {
  if (!items || items.length === 0) {
    return null;
  }

  const positiveWeightItems = items.filter(item => item.weight > 0);

  if (positiveWeightItems.length === 0) {
    // No items with positive weight, try to pick uniformly from non-negative items
    const nonNegativeWeightItems = items.filter(item => item.weight >= 0);
    if (nonNegativeWeightItems.length > 0) {
      return nonNegativeWeightItems[Math.floor(Math.random() * nonNegativeWeightItems.length)];
    }
    // All items have negative weight or list is empty (already handled), this case should be rare.
    return items.length > 0 ? items[Math.floor(Math.random() * items.length)] : null;
  }

  const totalWeight = positiveWeightItems.reduce((sum, item) => sum + item.weight, 0);
  // totalWeight should be > 0 here

  let random = Math.random() * totalWeight;

  for (const item of positiveWeightItems) {
    if (random < item.weight) {
      return item;
    }
    random -= item.weight;
  }

  // Fallback for floating point inaccuracies, should pick the last item.
  return positiveWeightItems[positiveWeightItems.length - 1];
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param array The array to shuffle.
 * @returns The shuffled array (same instance).
 */
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
