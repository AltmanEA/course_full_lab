export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type Task = {
  id: number;
  title: string;
  status: string;
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

export async function getTasks(): Promise<Task[]> {
  // Simulate network delay (400ms) — longer than getUsers
  await new Promise(resolve => setTimeout(resolve, 400));

  return [
    { id: 1, title: "Complete project report", status: "In Progress" },
    { id: 2, title: "Review pull request", status: "Pending" },
    { id: 3, title: "Update documentation", status: "Completed" },
  ];
}
