export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export const products: Product[] = [
  { id: 1, name: "Ноутбук", category: "Электроника", price: 99999, stock: 15 },
  { id: 2, name: "Смартфон", category: "Электроника", price: 59999, stock: 25 },
  { id: 3, name: "Наушники", category: "Электроника", price: 12999, stock: 50 },
  { id: 4, name: "Кофеварка", category: "Бытовая техника", price: 24999, stock: 10 },
  { id: 5, name: "Микроволновка", category: "Бытовая техника", price: 35999, stock: 8 },
  { id: 6, name: "Пылесос", category: "Бытовая техника", price: 18999, stock: 12 },
  { id: 7, name: "Фен", category: "Бытовая техника", price: 5999, stock: 30 },
  { id: 8, name: "Утюг", category: "Бытовая техника", price: 7999, stock: 20 },
  { id: 9, name: "Часы", category: "Аксессуары", price: 45999, stock: 5 },
  { id: 10, name: "Ремень", category: "Аксессуары", price: 4999, stock: 40 },
];