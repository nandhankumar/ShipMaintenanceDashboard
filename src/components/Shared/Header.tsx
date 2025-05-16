import React from 'react';
import { getData } from '../../utils/storage';

interface HeaderProps {
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
    const data = getData();
    
    return (
        <header>
            <div className="logo">ENTNT Ship Maintenance</div>
            <div className="user-info">
                <span>{data.currentUser?.role}</span>
                <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Header;