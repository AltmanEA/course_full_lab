import type { StatsData } from "./data";

type StatsProps = {
  data: StatsData;
};

export default function Stats({ data }: StatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <p className="text-sm text-gray-600">Total Revenue</p>
        <p className="text-2xl font-bold text-gray-900">
          ${data.totalRevenue.toLocaleString()}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <p className="text-sm text-gray-600">Total Customers</p>
        <p className="text-2xl font-bold text-gray-900">
          {data.totalCustomers.toLocaleString()}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <p className="text-sm text-gray-600">Pending Orders</p>
        <p className="text-2xl font-bold text-gray-900">
          {data.pendingOrders}
        </p>
      </div>
    </div>
  );
}