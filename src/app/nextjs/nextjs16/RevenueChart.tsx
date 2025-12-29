import type { RevenueData } from "./data";

type RevenueChartProps = {
  data: RevenueData[];
};

export default function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div data-testid="revenue-chart" className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue Chart</h2>
      <div className="flex items-end space-x-4 h-64">
        {data.map((item) => (
          <div key={item.month} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-blue-500 rounded-t transition-all duration-500"
              style={{
                height: `${(item.revenue / maxRevenue) * 100}%`,
                minHeight: "20px",
              }}
            />
            <p className="text-sm text-gray-600 mt-2">{item.month}</p>
            <p className="text-xs text-gray-500">${item.revenue.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}