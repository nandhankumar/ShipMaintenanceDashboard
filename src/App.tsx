import React, { useState, useEffect } from 'react';
import { getData } from './utils/storage';
import Login from './components/Login';
import Header from './components/Shared/Header';
import Navbar from './components/Shared/Navbar';
import Dashboard from './components/Dashboard';
import ShipsList from './components/Ships/ShipsList';
import ShipDetail from './components/Ships/ShipDetail';
import JobsList from './components/Jobs/JobsList';
import Calendar from './components/Calendar';
import Notifications from './components/Notifications';
import './styles/App.css';

interface CurrentView {
    currentShipId: string | null;
    currentMonth: number;
    currentYear: number;
}

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [currentView, setCurrentView] = useState<CurrentView>({
        currentShipId: null,
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear()
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const data = getData();
        setIsLoggedIn(!!data.currentUser);
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        const data = getData();
        data.currentUser = null;
        localStorage.setItem('shipMaintenanceData', JSON.stringify(data));
        setIsLoggedIn(false);
    };

    const viewShip = (shipId: string) => {
        setCurrentView(prev => ({ ...prev, currentShipId: shipId }));
        setCurrentPage('ship-detail');
    };

    const backToShips = () => {
        setCurrentView(prev => ({ ...prev, currentShipId: null }));
        setCurrentPage('ships');
    };

    if (!isLoggedIn) {
        return (
            <div className="login-container">
                <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
                    <h1 className="text-center mb-20">Ship Maintenance Dashboard</h1>
                    <Login onLogin={handleLogin} />
                </div>
            </div>
        );
    }

    return (
        <div id="app">
            <Header onLogout={handleLogout} />
            <div className="main-content">
                <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <div className="container">
                    {currentPage === 'dashboard' && <Dashboard />}
                    {currentPage === 'ships' && <ShipsList viewShip={viewShip} />}
                    {currentPage === 'ship-detail' && currentView.currentShipId && (
                        <ShipDetail shipId={currentView.currentShipId} backToShips={backToShips} />
                    )}
                    {currentPage === 'jobs' && <JobsList />}
                    {currentPage === 'calendar' && (
                        <Calendar 
                            currentMonth={currentView.currentMonth} 
                            currentYear={currentView.currentYear}
                            setCurrentView={setCurrentView}
                        />
                    )}
                    {currentPage === 'notifications' && <Notifications />}
                </div>
            </div>
        </div>
    );
};

export default App;