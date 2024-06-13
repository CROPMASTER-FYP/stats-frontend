import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { format, parseISO } from 'date-fns';

const colors = [
  '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#d0ed57',
  '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#d0ed57'
];

const CropData = () => {
  const [data, setData] = useState([]);
  const [colorMap, setColorMap] = useState({});

  useEffect(() => {
    fetch('https://tyktyk.pythonanywhere.com/orders/stats/monthly/')
      .then(response => response.json())
      .then(monthlyData => {
        const products = getUniqueProducts(monthlyData);
        const formattedData = formatMonthlyData(monthlyData, products);
        setData(formattedData);
        generateColorMap(products);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getUniqueProducts = (monthlyData) => {
    const products = new Set();
    monthlyData.forEach(item => {
      products.add(item.product);
    });
    return Array.from(products);
  };

  const generateColorMap = (products) => {
    const colorMap = {};
    products.forEach((product, index) => {
      colorMap[product] = colors[index % colors.length];
    });
    setColorMap(colorMap);
  };

  const formatMonthlyData = (monthlyData, products) => {
    const dataMap = {};

    monthlyData.forEach(item => {
      const month = item.month;
      const product = item.product;
      const quantity = item.total_quantity;

      if (!dataMap[month]) {
        dataMap[month] = {};
        products.forEach(product => {
          dataMap[month][product] = 0;
        });
      }

      dataMap[month][product] += quantity;
    });

    const formattedData = Object.keys(dataMap).map(month => {
      const monthData = { month };
      Object.keys(dataMap[month]).forEach(product => {
        monthData[product] = dataMap[month][product];
      });
      return monthData;
    });

    return formattedData;
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'yyyy-MMM');
  };

  return (
    <div>
      <h1>All orders statistics</h1>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tickFormatter={formatDate} />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.length > 0 && Object.keys(data[0]).filter(key => key !== 'month').map((product, index) => (
          <Bar key={index} dataKey={product} fill={colorMap[product]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

export default CropData;
