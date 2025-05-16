import React, { useState } from 'react';
import { getData } from '../utils/storage';

interface CalendarProps {
    currentMonth: number;
    currentYear: number;
    setCurrentView: (view: { currentMonth: number; currentYear: number }) => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentMonth, currentYear, setCurrentView }) => {
    const data = getData();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    const [selectedDate, setSelectedDate] = useState('');
    const [showDayJobsModal, setShowDayJobsModal] = useState(false);
    const [dayJobs, setDayJobs] = useState<Array<{
        id: string;
        type: string;
        priority: string;
        status: string;
        componentId: string;
    }>>([]);

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const showDayJobs = (dateStr: string) => {
        const jobs = data.jobs?.filter(job => job.scheduledDate === dateStr) || [];
        setDayJobs(jobs);
        setSelectedDate(dateStr);
        setShowDayJobsModal(true);
    };

    const renderCalendarDays = () => {
        const days = [];
        
        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }
        
        // Day cells
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const jobsOnDay = data.jobs?.filter(job => job.scheduledDate === dateStr);
            
            if (jobsOnDay?.length) {
                days.push(
                    <div 
                        key={i} 
                        className="calendar-day has-jobs"
                        onClick={() => showDayJobs(dateStr)}
                    >
                        <div className="day-number">{i}</div>
                        <span className="job-indicator">{jobsOnDay.length}</span>
                    </div>
                );
            } else {
                days.push(
                    <div key={i} className="calendar-day">
                        <div className="day-number">{i}</div>
                    </div>
                );
            }
        }
        
        return days;
    };

    return (
        <div id="calendar-page" className="page">
            <h2 className="mb-20">Maintenance Calendar</h2>
            
            <div className="card">
                <div className="flex-between mb-20">
                    <h3>{monthNames[currentMonth]} {currentYear}</h3>
                    <div>
                        <button 
                            className="btn btn-secondary" 
                            onClick={() => setCurrentView({
                                currentMonth: currentMonth === 0 ? 11 : currentMonth - 1,
                                currentYear: currentMonth === 0 ? currentYear - 1 : currentYear
                            })}
                        >
                            Previous
                        </button>
                        <button 
                            className="btn btn-secondary" 
                            onClick={() => setCurrentView({
                                currentMonth: currentMonth === 11 ? 0 : currentMonth + 1,
                                currentYear: currentMonth === 11 ? currentYear + 1 : currentYear
                            })}
                        >
                            Next
                        </button>
                    </div>
                </div>
                
                <div className="calendar">
                    <div className="calendar-header">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div className="calendar-grid">
                        {renderCalendarDays()}
                    </div>
                </div>
            </div>

            {showDayJobsModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">
                                Jobs on {new Date(selectedDate).toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </h3>
                            <button className="close-btn" onClick={() => setShowDayJobsModal(false)}>&times;</button>
                        </div>
                        <div>
                            {dayJobs.map(job => {
                                const component = data.components?.find(c => c.id === job.componentId);
                                const ship = component ? data.ships?.find(s => s.id === component.shipId) : null;
                                
                                return (
                                    <div key={job.id} className="notification">
                                        <h3>{job.type} - {job.priority}</h3>
                                        <p>Status: {job.status}</p>
                                        {component && <p>Component: {component.name}</p>}
                                        {ship && <p>Ship: {ship.name}</p>}
                                        <small>Job ID: {job.id}</small>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;