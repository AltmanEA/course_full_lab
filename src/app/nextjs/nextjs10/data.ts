export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export async function getUsers(): Promise<User[]> {
  // Simulate network delay (100ms)
  await new Promise(resolve => setTimeout(resolve, 100));

  return [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "User" },
  ];
}