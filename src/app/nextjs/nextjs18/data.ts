export interface Item {
  id: number;
  name: string;
  price: number;
}

export const items: Item[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Товар ${i + 1}`,
  price: (i + 1) * 100,
}));

export function getPaginatedItems(page: number, limit = 5) {
  const start = (page - 1) * limit;
  const end = start + limit;
  return items.slice(start, end);
}

export function getTotalPages(limit = 5) {
  return Math.ceil(items.length / limit);
}