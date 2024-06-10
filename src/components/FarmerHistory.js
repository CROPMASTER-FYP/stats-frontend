// src/FarmerOrderHistory.js
import React, { useState, useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const getColor = (() => {
  const colors = {};
  let nextColorIndex = 0;
  const colorPalette = [
    'rgba(75, 192, 192, 0.6)', 'rgba(192, 75, 75, 0.6)', 'rgba(75, 75, 192, 0.6)',
    'rgba(192, 192, 75, 0.6)', 'rgba(192, 75, 192, 0.6)', 'rgba(75, 192, 75, 0.6)',
    // more colors .............
  ];
  
  return (crop) => {
    if (!colors[crop]) {
      colors[crop] = colorPalette[nextColorIndex % colorPalette.length];
      nextColorIndex += 1;
    }
    return colors[crop];
  };
})();

const FarmerOrderHistory = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/orders/farmer/my_orders/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // Compute the sum of total_cost
  const totalSum = useMemo(() => {
    return orders.reduce((sum, order) => sum + parseFloat(order.total_cost), 0).toFixed(2);
  }, [orders]);

  // Sort orders for table display
  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [orders]);

  // Prepare data for the bar chart
  const data = {
    labels: orders.map(order => `${new Date(order.created_at).toLocaleDateString('en-GB')} - ${order.product_name}`),
    datasets: [
      {
        label: 'Quantity',
        data: orders.map(order => parseFloat(order.quantity)),
        backgroundColor: orders.map(order => getColor(order.product_name)),
      },
    ],
  };

const farmerName = orders.length > 0 ? orders[0].farmer_name : 'Unknown Farmer';

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>My order report --  {farmerName} </h1>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Order Date</th>
            <th>Buyer Name</th>
            <th>Crop</th>
            <th>Quantity</th>
            <th>Total cost</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{new Date(order.created_at).toLocaleDateString('en-GB')}</td>
              <td>{order.buyer_name}</td>
              <td>{order.product_name}</td>
              <td>{order.quantity}</td>
              <td>{order.total_cost}</td>
              <td style={{ color: order.processed ? 'green' : 'red' }}>
                {order.processed ? 'Delivered' : 'Pending'}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Sum</td>
            <td style={{ fontWeight: 'bold' }}>{totalSum}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Bar data={data} />
    </div>
  );
};

export default FarmerOrderHistory;
