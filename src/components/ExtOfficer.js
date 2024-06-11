import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const ExtensionOfficerDashboard = ({ token, userId }) => {
  const [consultations, setConsultations] = useState([]);
  const [cropDistribution, setCropDistribution] = useState([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get(`https://tyktyk.pythonanywhere.com/seek-advice/${userId}/messages/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const sortedConsultations = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setConsultations(sortedConsultations);
      } catch (error) {
        console.error("Error fetching consultations", error);
      }
    };

    const fetchCropDistribution = async () => {
      try {
        const response = await axios.get('https://tyktyk.pythonanywhere.com/cropinfo/crop-distribution/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setCropDistribution(response.data);
      } catch (error) {
        console.error("Error fetching crop distribution data", error);
      }
    };

    fetchConsultations();
    fetchCropDistribution();
  }, [token, userId]);

  const pieData = {
    labels: cropDistribution.map(cd => cd.crops_grown__name),
    datasets: [
      {
        label: 'Farmers',
        data: cropDistribution.map(cd => cd.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw;
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${percentage}%`;
          }
        }
      }
    }
  };

  const barData = {
    labels: cropDistribution.map(cd => cd.crops_grown__name),
    datasets: [
      {
        label: 'Farmers',
        data: cropDistribution.map(cd => cd.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,  // This allows us to manually set the height
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const chartContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',  // This aligns the charts at the bottom
    flexWrap: 'wrap',
  };

  const chartStyle = {
    flex: 1,
    minWidth: '300px',
    maxWidth: '500px',  // Increased max width for the bar chart
    height: '400px',  // Set a fixed height to ensure alignment
    margin: '20px',
  };

  const pieChartStyle = {
    flex: 1,
    minWidth: '300px',
    maxWidth: '300px',  // Set max width for the pie chart
    height: '300px',  // Set a fixed height for the pie chart
    margin: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const thStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left',
  };

  const trStyle = {
    '&:nth-child(even)': { backgroundColor: '#f2f2f2' },
    '&:hover': { backgroundColor: '#ddd' },
  };

  return (
    <div>
      <h1>Extension Officer Dashboard</h1>
      <div style={chartContainerStyle}>
        <div style={chartStyle}>
          <Bar data={barData} options={barOptions} />
        </div>
        <div style={pieChartStyle}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
      <h2>Consultation Records</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...thStyle }}>Date</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Farmer</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Problem</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation, index) => (
            <tr key={index} style={trStyle}>
              <td style={thTdStyle}>{new Date(consultation.created_at).toLocaleDateString()}</td>
              <td style={thTdStyle}>{consultation.sender}</td>
              <td style={thTdStyle}>{consultation.topic}</td>
              <td style={thTdStyle}>{consultation.responses.map(response => response.response_text).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExtensionOfficerDashboard;

