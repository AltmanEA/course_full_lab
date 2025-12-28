import { NextResponse } from "next/server";

// Глобальный счётчик для отслеживания запросов в рамках теста
let requestCount = 0;

export async function GET() {
  requestCount++;
  
  return NextResponse.json({
    message: "Static data",
    timestamp: new Date().toISOString(),
    requestCount,
  });
}

// Функция для сброса счётчика (используется в тестах)
export function resetRequestCount() {
  requestCount = 0;
}