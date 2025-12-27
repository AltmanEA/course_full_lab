import { cache } from "react";

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

// Cache ensures truly async behavior for Suspense
const getUsersImpl = async (): Promise<User[]> => {
  // Simulate network delay (500ms) — enough for loading state to show
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "User" },
  ];
};

const getTasksImpl = async (): Promise<Task[]> => {
  // Simulate network delay (500ms) — enough for loading state to show
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    { id: 1, title: "Complete project report", status: "In Progress" },
    { id: 2, title: "Review pull request", status: "Pending" },
    { id: 3, title: "Update documentation", status: "Completed" },
  ];
};

// Use React cache to create truly async functions
export const getUsers = cache(getUsersImpl);
export const getTasks = cache(getTasksImpl);