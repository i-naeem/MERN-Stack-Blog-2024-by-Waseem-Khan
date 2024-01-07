import './App.css';
import React, {useEffect} from 'react';
import RoutesList from './routes/RoutesList';
import {useNavigate} from 'react-router-dom';
import {initFlowbite} from 'flowbite';
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = () => {
      // Run initFlowbite on each route change
      initFlowbite();
    };

    // Run initFlowbite on the initial render
    initFlowbite();

    // Add navigation event listener
    navigate(handleNavigation);

    // Cleanup the listener when the component unmounts
    return () => {
      // Note: React Router v6's useNavigate doesn't require cleanup
    };
  }, [navigate]);
  return (
    <React.Fragment>
      <RoutesList />
    </React.Fragment>
  );
}

export default App;
