import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

import { RechartsDevtools } from "@recharts/devtools";

export default function CustomLineChart({ data, type }) {

  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString("en-IN")}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { amount, categories } = payload[0].payload;

      return (
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-3"
          style={{ minWidth: 160 }}
        >
          <p className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2">
            {label}
          </p>

          <p className="text-purple-700 font-bold my-2">
            Total: {formatCurrency(amount)}
          </p>

          {categories &&
            Object.entries(categories).map(([name, value]) => (
              <div
                key={name}
                className="flex justify-between text-xs text-gray-600"
              >
                <span>{name}</span>
                <span>{formatCurrency(value)}</span>
              </div>
            ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 5, left: 10 }}
        >
          {/* Gradient for line */}
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid
            stroke="#f3f4f6"
            strokeDasharray="3 3"
            vertical={false}
          />

          {/* X Axis */}
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />

          {/* Y Axis */}
          <YAxis
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />

          {/* Tooltip */}
          <Tooltip content={CustomTooltip} />

          {/* Legend */}
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ fontSize: 12 }}
          />

          {/* Area shadow */}
          <Area
            type="monotone"
            dataKey="amount"
            stroke="none"
            fill="url(#incomeGradient)"
          />

          {/* Main line */}
          <Line
            type="monotone"
            dataKey="amount"
            name={type}
            stroke="#7c3aed"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            animationDuration={800}
          />

          {import.meta.env.DEV && <RechartsDevtools />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}