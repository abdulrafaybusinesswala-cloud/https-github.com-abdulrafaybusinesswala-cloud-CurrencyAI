import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendPoint } from '../types';

interface TrendChartProps {
  data: TrendPoint[];
  color?: string;
}

const TrendChart: React.FC<TrendChartProps> = ({ data, color = "#10b981" }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-48 mt-6">
      <h3 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
        5-Day Trend
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10, fill: '#94a3b8' }} 
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => {
                const d = new Date(value);
                return `${d.getMonth()+1}/${d.getDate()}`;
            }}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            tick={{ fontSize: 10, fill: '#94a3b8' }} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f8fafc'
            }}
            itemStyle={{ color: color }}
            labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke={color}
            fillOpacity={1}
            fill="url(#colorRate)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
