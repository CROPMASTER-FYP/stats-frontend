// import React, { useState, useEffect } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';

// const BarChartComponent = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/orders/stats/weekly/')
//       .then(response => response.json())
//       .then(weeklyData => {
//         const formattedData = formatWeeklyData(weeklyData);
//         setData(formattedData);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const formatWeeklyData = (weeklyData) => {
//     const dataMap = {};

//     weeklyData.forEach(item => {
//       const week = item.week;
//       const product = item.product;
//       const quantity = item.total_quantity;

//       if (!dataMap[week]) {
//         dataMap[week] = {};
//       }

//       if (!dataMap[week][product]) {
//         dataMap[week][product] = 0;
//       }

//       dataMap[week][product] += quantity;
//     });

//     const formattedData = Object.keys(dataMap).map(week => {
//       const weekData = { week };
//       Object.keys(dataMap[week]).forEach(product => {
//         weekData[product] = dataMap[week][product];
//       });
//       return weekData;
//     });

//     return formattedData;
//   };

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart
//         width={600}
//         height={300}
//         data={data}
//         margin={{
//           top: 5, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="week" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         {data.length > 0 && Object.keys(data[0]).filter(key => key !== 'week').map((product, index) => (
//           <Bar key={index} dataKey={product} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
//         ))}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

// export default BarChartComponent;



// import React, { useState, useEffect } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';

// const colors = [
//   '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#d0ed57',
//   '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#d0ed57'
// ];

// const CropData = () => {
//   const [data, setData] = useState([]);
//   const [colorMap, setColorMap] = useState({});

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/orders/stats/weekly/')
//       .then(response => response.json())
//       .then(weeklyData => {
//         const formattedData = formatWeeklyData(weeklyData);
//         setData(formattedData);
//         generateColorMap(weeklyData);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const generateColorMap = (weeklyData) => {
//     const colorMap = {};
//     let colorIndex = 0;

//     weeklyData.forEach(item => {
//       if (!colorMap[item.product]) {
//         colorMap[item.product] = colors[colorIndex % colors.length];
//         colorIndex += 1;
//       }
//     });

//     setColorMap(colorMap);
//   };

//   const formatWeeklyData = (weeklyData) => {
//     const dataMap = {};

//     weeklyData.forEach(item => {
//       const week = item.week;
//       const product = item.product;
//       const quantity = item.total_quantity;

//       if (!dataMap[week]) {
//         dataMap[week] = {};
//       }

//       if (!dataMap[week][product]) {
//         dataMap[week][product] = 0;
//       }

//       dataMap[week][product] += quantity;
//     });

//     const formattedData = Object.keys(dataMap).map(week => {
//       const weekData = { week };
//       Object.keys(dataMap[week]).forEach(product => {
//         weekData[product] = dataMap[week][product];
//       });
//       return weekData;
//     });

//     return formattedData;
//   };

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart
//         width={600}
//         height={300}
//         data={data}
//         margin={{
//           top: 5, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="week" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         {data.length > 0 && Object.keys(data[0]).filter(key => key !== 'week').map((product, index) => (
//           <Bar key={index} dataKey={product} fill={colorMap[product]} />
//         ))}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

// export default CropData;






// import React, { useState, useEffect } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';

// const colors = [
//   '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#d0ed57',
//   '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#d0ed57'
// ];

// const CropData = () => {
//   const [data, setData] = useState([]);
//   const [colorMap, setColorMap] = useState({});

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/orders/stats/monthly/')
//       .then(response => response.json())
//       .then(monthlyData => {
//         const formattedData = formatMonthlyData(monthlyData);
//         setData(formattedData);
//         generateColorMap(monthlyData);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const generateColorMap = (monthlyData) => {
//     const colorMap = {};
//     let colorIndex = 0;

//     monthlyData.forEach(item => {
//       if (!colorMap[item.product]) {
//         colorMap[item.product] = colors[colorIndex % colors.length];
//         colorIndex += 1;
//       }
//     });

//     setColorMap(colorMap);
//   };

//   const formatMonthlyData = (monthlyData) => {
//     const dataMap = {};

//     monthlyData.forEach(item => {
//       const month = item.month;
//       const product = item.product;
//       const quantity = item.total_quantity;

//       if (!dataMap[month]) {
//         dataMap[month] = {};
//       }

//       if (!dataMap[month][product]) {
//         dataMap[month][product] = 0;
//       }

//       dataMap[month][product] += quantity;
//     });

//     const formattedData = Object.keys(dataMap).map(month => {
//       const monthData = { month };
//       Object.keys(dataMap[month]).forEach(product => {
//         monthData[product] = dataMap[month][product];
//       });
//       return monthData;
//     });

//     return formattedData;
//   };

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart
//         width={600}
//         height={300}
//         data={data}
//         margin={{
//           top: 5, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         {data.length > 0 && Object.keys(data[0]).filter(key => key !== 'month').map((product, index) => (
//           <Bar key={index} dataKey={product} fill={colorMap[product]} />
//         ))}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

// export default CropData;




// import React, { useState, useEffect } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';

// const colors = [
//   '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#d0ed57',
//   '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#d0ed57'
// ];

// const CropData = () => {
//   const [data, setData] = useState([]);
//   const [colorMap, setColorMap] = useState({});

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/orders/stats/monthly/')
//       .then(response => response.json())
//       .then(monthlyData => {
//         const products = getUniqueProducts(monthlyData);
//         const formattedData = formatMonthlyData(monthlyData, products);
//         setData(formattedData);
//         generateColorMap(products);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const getUniqueProducts = (monthlyData) => {
//     const products = new Set();
//     monthlyData.forEach(item => {
//       products.add(item.product);
//     });
//     return Array.from(products);
//   };

//   const generateColorMap = (products) => {
//     const colorMap = {};
//     products.forEach((product, index) => {
//       colorMap[product] = colors[index % colors.length];
//     });
//     setColorMap(colorMap);
//   };

//   const formatMonthlyData = (monthlyData, products) => {
//     const dataMap = {};

//     monthlyData.forEach(item => {
//       const month = item.month;
//       const product = item.product;
//       const quantity = item.total_quantity;

//       if (!dataMap[month]) {
//         dataMap[month] = {};
//         products.forEach(product => {
//           dataMap[month][product] = 0;
//         });
//       }

//       dataMap[month][product] += quantity;
//     });

//     const formattedData = Object.keys(dataMap).map(month => {
//       const monthData = { month };
//       Object.keys(dataMap[month]).forEach(product => {
//         monthData[product] = dataMap[month][product];
//       });
//       return monthData;
//     });

//     return formattedData;
//   };

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart
//         width={600}
//         height={300}
//         data={data}
//         margin={{
//           top: 5, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         {data.length > 0 && Object.keys(data[0]).filter(key => key !== 'month').map((product, index) => (
//           <Bar key={index} dataKey={product} fill={colorMap[product]} />
//         ))}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

// export default CropData;


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
    fetch('http://127.0.0.1:8000/orders/stats/monthly/')
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
  );
}

export default CropData;
