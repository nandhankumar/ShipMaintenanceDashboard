import React from 'react';

interface NavbarProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <nav>
            <ul className="nav-links">
                <li>
                    <a 
                        href="#" 
                        className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage('dashboard');
                        }}
                    >
                        Dashboard
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        className={`nav-link ${currentPage === 'ships' ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage('ships');
                        }}
                    >
                        Ships
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        className={`nav-link ${currentPage === 'jobs' ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage('jobs');
                        }}
                    >
                        Maintenance Jobs
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        className={`nav-link ${currentPage === 'calendar' ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage('calendar');
                        }}
                    >
                        Calendar
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        className={`nav-link ${currentPage === 'notifications' ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage('notifications');
                        }}
                    >
                        Notifications
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;