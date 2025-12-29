import { cache } from "react";

export type RevenueData = {
  month: string;
  revenue: number;
};

export type StatsData = {
  totalRevenue: number;
  totalCustomers: number;
  pendingOrders: number;
};

// Медленный fetch — 2000мс задержка
const fetchRevenueImpl = async (): Promise<RevenueData[]> => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  return [
    { month: "Jan", revenue: 12500 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 19500 },
    { month: "Jun", revenue: 25000 },
  ];
};

// Быстрый fetch — 300мс задержка
const fetchStatsImpl = async (): Promise<StatsData> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    totalRevenue: 112000,
    totalCustomers: 1245,
    pendingOrders: 32,
  };
};

// Используем cache для создания асинхронных функций для Suspense
export const fetchRevenue = cache(fetchRevenueImpl);
export const fetchStats = cache(fetchStatsImpl);