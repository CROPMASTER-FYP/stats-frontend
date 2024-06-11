import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { parseISO, format } from 'date-fns';

const UserVisits = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://tyktyk.pythonanywhere.comapi/uservisits/statistics/')
      .then(response => response.json())
      .then(dailyData => {
        const aggregatedData = aggregateMonthlyData(dailyData);
        setData(aggregatedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const aggregateMonthlyData = (dailyData) => {
    const monthlyData = {};

    Object.keys(dailyData).forEach(dateString => {
      const date = parseISO(dateString);
      const month = format(date, 'yyyy-MM');

      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }
      monthlyData[month] += dailyData[dateString];
    });

    return Object.keys(monthlyData).map(month => ({
      name: month,
      visits: monthlyData[month],
    }));
  };

  const formatMonth = (monthString) => {
    const date = parseISO(`${monthString}-01`);
    return format(date, 'MMM');
  };

  const findJanuaryIndex = (data) => {
    return data.findIndex(item => item.name.endsWith('-01'));
  };

  const januaryIndex = findJanuaryIndex(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5, right: 20, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickFormatter={formatMonth} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="visits" fill="#5885AF" />
        {januaryIndex !== -1 && januaryIndex > 0 && (
          <ReferenceLine x={januaryIndex - 0.5} stroke="red" label="Year Change" />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default UserVisits;
