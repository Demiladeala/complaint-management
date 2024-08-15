import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar,
 } from 'recharts';

export const TotalComplaintsChart: React.FC<{ data: any[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="complaints" stroke="#1479A7" activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

const COLORS = ['#254364', '#5791C4', '#A1C3E1', '#F0E', '#F0F'];

export const ComplaintsByTypeChart: React.FC<{ data: any[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="type"
        outerRadius={120}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export const ComplaintsByStatusChart: React.FC<{ data: any[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="status" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#254364" />
    </BarChart>
  </ResponsiveContainer>
);