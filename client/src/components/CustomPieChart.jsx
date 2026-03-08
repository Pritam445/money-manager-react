import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const CustomPieChart = ({
  data,
  colors,
  label,
  totalAmount,
  showTextAnchor
}) => {

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;

      return (
        <div className="bg-white p-3 rounded-lg shadow-md border">
          <p className="text-sm font-semibold">{item.name}</p>
          <p className="text-purple-700 font-bold">
            {item.icon} {item.value.toLocaleString()}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <PieChart>

          {/* Pie */}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            labelLine={false}
            label={
              showTextAnchor
                ? ({ percent }) =>
                    `${(percent * 100).toFixed(0)}%`
                : false
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          {/* Tooltip */}
          <Tooltip content={CustomTooltip} />

          {/* Legend */}
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
          />

          {/* Center Text */}
          <text
            x="50%"
            y="45%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm fill-gray-500"
          >
            {label}
          </text>

          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-lg font-bold fill-purple-700"
          >
            {totalAmount}
          </text>

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;