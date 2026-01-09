"use client";

import { createInvoiceAction } from "./actions";

function handleSubmit(formData: FormData) {
  // TODO: Добавить useActionState и safeParse для валидации
  const state = { success: false, message: "", errors: {} };
  void createInvoiceAction(state, formData);
}

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Создание инвойса</h1>

      <form action={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="customer_id" className="block text-sm font-medium">
            Клиент
          </label>
          <select
            id="customer_id"
            name="customer_id"
            className="mt-1 block w-full border rounded p-2"
          >
            <option value="">Выберите клиента</option>
            <option value="customer_1">Alice Johnson</option>
            <option value="customer_2">Bob Smith</option>
            <option value="customer_3">Carol White</option>
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium">
            Сумма ($)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="mt-1 block w-full border rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium">
            Статус
          </label>
          <select
            id="status"
            name="status"
            className="mt-1 block w-full border rounded p-2"
          >
            <option value="">Выберите статус</option>
            <option value="pending">pending</option>
            <option value="paid">paid</option>
            <option value="void">void</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Создать
        </button>
      </form>
    </div>
  );
}