export interface Item {
  id: number;
  name: string;
  price: number;
  category: string;
}

export const items: Item[] = [
  { id: 1, name: "Ноутбук", price: 50000, category: "Электроника" },
  { id: 2, name: "Смартфон", price: 30000, category: "Электроника" },
  { id: 3, name: "Наушники", price: 5000, category: "Электроника" },
  { id: 4, name: "Клавиатура", price: 3000, category: "Электроника" },
  { id: 5, name: "Мышь", price: 2000, category: "Электроника" },
  { id: 6, name: "Монитор", price: 15000, category: "Электроника" },
  { id: 7, name: "Кофеварка", price: 8000, category: "Бытовая техника" },
  { id: 8, name: "Чайник", price: 2000, category: "Бытовая техника" },
  { id: 9, name: "Микроволновка", price: 10000, category: "Бытовая техника" },
  { id: 10, name: "Пылесос", price: 12000, category: "Бытовая техника" },
  { id: 11, name: "Стол", price: 15000, category: "Мебель" },
  { id: 12, name: "Стул", price: 5000, category: "Мебель" },
  { id: 13, name: "Шкаф", price: 25000, category: "Мебель" },
  { id: 14, name: "Кровать", price: 35000, category: "Мебель" },
  { id: 15, name: "Диван", price: 40000, category: "Мебель" },
  { id: 16, name: "Телевизор", price: 45000, category: "Электроника" },
  { id: 17, name: "Планшет", price: 25000, category: "Электроника" },
  { id: 18, name: "Принтер", price: 8000, category: "Электроника" },
  { id: 19, name: "Весы", price: 1500, category: "Бытовая техника" },
  { id: 20, name: "Утюг", price: 3000, category: "Бытовая техника" },
];

export function getFilteredAndPaginatedItems(
  query: string,
  page: number,
  limit = 5
) {
  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const start = (page - 1) * limit;
  const end = start + limit;

  return filtered.slice(start, end);
}

export function getTotalFilteredPages(query: string, limit = 5) {
  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );
  return Math.ceil(filtered.length / limit);
}

export function getTotalItems(query: string) {
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  ).length;
}