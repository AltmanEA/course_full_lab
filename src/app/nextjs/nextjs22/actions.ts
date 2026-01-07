'use server';

export async function deleteInvoice({ id }: { id: string }) {
  // TODO: Реализовать удаление инвойса
  // 1. Удалить запись из БД (массива invoices)
  // 2. Вызвать revalidatePath для обновления UI
}