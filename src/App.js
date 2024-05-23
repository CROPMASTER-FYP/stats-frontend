import React from 'react';
import CropData from './components/CropData';
import UserVisits from './components/UserVisits';

function App() {
  return (
    <div className="App">
      <h1>Monthly Visits</h1>
      <UserVisits/>
      <h1>Crop data</h1>
      <CropData/>
    </div>
  );
}

export default App;
