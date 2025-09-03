// src/App.tsx

import React from 'react'; // 'useEffect' can be removed as it's no longer used
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './components/Dashboard';
import { DailyReports } from './components/DailyReports';
import { CustomerOrderView } from './components/CustomerOrderView';
import { Navigation } from './components/Navigation';

function App() {

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<DailyReports />} />
          <Route path="/customer/:tableNumber" element={<CustomerOrderViewWrapper />} />
        </Routes>
        
        {/* STEP 4: DELETE THE DevControls COMPONENT FROM BEING RENDERED.
            This will remove the test buttons from your UI. */}
        {/* <DevControls /> */}
        
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

const CustomerOrderViewWrapper: React.FC = () => {
  const tableNumber = parseInt(window.location.pathname.split('/').pop() || '1');
  return <CustomerOrderView tableNumber={tableNumber} />;
};

export default App;