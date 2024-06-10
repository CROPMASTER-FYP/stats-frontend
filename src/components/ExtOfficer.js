// src/ExtensionOfficerDashboard.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const ExtensionOfficerDashboard = () => {
  const cropDistribution = [
    { crop: 'Maize', count: 40 },
    { crop: 'Wheat', count: 30 },
    { crop: 'Rice', count: 20 },
    { crop: 'Other', count: 10 },
  ];

  const consultations = [
    { date: '2024-01-01', farmer: 'Farmer X', problem: 'Pest Infestation', feedback: 'Use pesticide ABC' },
    { date: '2024-02-15', farmer: 'Farmer Y', problem: 'Low Yield', feedback: 'Improve irrigation' },
    // Add more consultations as needed
  ];

  const pieData = {
    labels: cropDistribution.map(cd => cd.crop),
    datasets: [
      {
        label: 'Crop Distribution',
        data: cropDistribution.map(cd => cd.count),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'],
      },
    ],
  };

  return (
    <div>
      <h1>Extension Officer Dashboard</h1>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <Pie data={pieData} />
      </div>
      <h2>Consultation Records</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Farmer</th>
            <th>Problem</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation, index) => (
            <tr key={index}>
              <td>{consultation.date}</td>
              <td>{consultation.farmer}</td>
              <td>{consultation.problem}</td>
              <td>{consultation.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExtensionOfficerDashboard;
