// Mock data functions simulating slow API calls

export type DashboardData = {
  message: string;
  timestamp: string;
  users: number;
  status: string;
};

const getDashboardDataImpl = async (): Promise<DashboardData> => {
  // Simulate network delay (3000ms) — enough for loading state to be visible
  await new Promise(resolve => setTimeout(resolve, 3000));

  return {
    message: "Dashboard loaded successfully",
    timestamp: new Date().toISOString(),
    users: 156,
    status: "Active",
  };
};

export const getDashboardData = getDashboardDataImpl;