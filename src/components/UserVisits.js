// import React, { useState, useEffect } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';
// import { parseISO, format } from 'date-fns';

// const hardcodedData = {
//   "2024-01-13": 10,
//   "2024-01-14": 20,
//   "2024-03-15": 5,
//   "2024-04-16": 4,
//   "2024-05-17": 3,
//   "2024-05-18": 4,
//   "2024-07-19": 12,
//   "2024-06-13": 10,
//   "2024-07-14": 20,
//   "2024-08-15": 5,
//   "2024-09-16": 4,
//   "2024-10-17": 3,
//   "2024-11-18": 4,
//   "2024-12-19": 20
// };


// // const hardcodedData = {
// //     "2024-05-13": 0,
// //     "2024-05-14": 0,
// //     "2024-05-15": 0,
// //     "2024-05-16": 0,
// //     "2024-05-17": 3,
// //     "2024-05-18": 1,
// //     "2024-05-19": 0
// // }


// const BarChartComponent = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const aggregatedData = aggregateMonthlyData(hardcodedData);
//     setData(aggregatedData);
//   }, []);

//   const aggregateMonthlyData = (dailyData) => {
//     const monthlyData = {};

//     Object.keys(dailyData).forEach(dateString => {
//       const date = parseISO(dateString);
//       const month = format(date, 'yyyy-MM');

//       if (!monthlyData[month]) {
//         monthlyData[month] = 0;
//       }
//       monthlyData[month] += dailyData[dateString];
//     });

//     return Object.keys(monthlyData).map(month => ({
//       name: month,
//       visits: monthlyData[month],
//     }));
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
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="visits" fill="#8884d8" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

// export default BarChartComponent;



// import React, { useState, useEffect } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
// } from 'recharts';
// import { parseISO, format } from 'date-fns';

// const UserVisits = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
    
//     fetch('http://127.0.0.1:8000/api/uservisits/statistics/')
//       .then(response => response.json())
//       .then(dailyData => {
//         const aggregatedData = aggregateMonthlyData(dailyData);
//         setData(aggregatedData);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const aggregateMonthlyData = (dailyData) => {
//     const monthlyData = {};

//     Object.keys(dailyData).forEach(dateString => {
//       const date = parseISO(dateString);
//       const month = format(date, 'yyyy-MM');

//       if (!monthlyData[month]) {
//         monthlyData[month] = 0;
//       }
//       monthlyData[month] += dailyData[dateString];
//     });

//     return Object.keys(monthlyData).map(month => ({
//       name: month,
//       visits: monthlyData[month],
//     }));
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
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="visits" fill="#5885AF" />
//         {/* 8884d8 */}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

// export default UserVisits;




// import React, { useState, useEffect } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
// } from 'recharts';
// import { parseISO, format } from 'date-fns';

// const UserVisits = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/uservisits/statistics/')
//       .then(response => response.json())
//       .then(dailyData => {
//         const aggregatedData = aggregateMonthlyData(dailyData);
//         setData(aggregatedData);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const aggregateMonthlyData = (dailyData) => {
//     const monthlyData = {};

//     Object.keys(dailyData).forEach(dateString => {
//       const date = parseISO(dateString);
//       const month = format(date, 'yyyy-MM');

//       if (!monthlyData[month]) {
//         monthlyData[month] = 0;
//       }
//       monthlyData[month] += dailyData[dateString];
//     });

//     return Object.keys(monthlyData).map(month => ({
//       name: month,
//       visits: monthlyData[month],
//     }));
//   };

//   const formatMonth = (monthString) => {
//     const date = parseISO(`${monthString}-01`);
//     return format(date, 'MMM');
//   };

//   const findJanuaryIndex = (data) => {
//     return data.findIndex(item => item.name.endsWith('-01'));
//   };

//   const januaryIndex = findJanuaryIndex(data);

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
//         <XAxis dataKey="name" tickFormatter={formatMonth} />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="visits" fill="#5885AF" />
//         {januaryIndex !== -1 && (
//           <ReferenceLine x={data[januaryIndex].name} stroke="red" label="Year Change" />
//         )}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

// export default UserVisits;



import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { parseISO, format } from 'date-fns';

const UserVisits = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/uservisits/statistics/')
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
          top: 5, right: 30, left: 20, bottom: 5,
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
