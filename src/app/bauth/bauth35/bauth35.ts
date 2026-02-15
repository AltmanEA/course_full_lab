export async function executeProtectedMutation(
  mutation: () => Promise<string>
): Promise<string> {
  // TODO: реализовать корректную обработку ошибок
  return mutation()
}
