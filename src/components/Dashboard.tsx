import React, { useEffect, useState } from 'react';
import { getData } from '../utils/storage';
import KpiCard from './Shared/KpiCard';

const Dashboard: React.FC = () => {
    const [data, setData] = useState(getData());
    const [overdueComponents, setOverdueComponents] = useState(0);
    const [jobsInProgress, setJobsInProgress] = useState(0);
    const [jobsCompleted, setJobsCompleted] = useState(0);

    useEffect(() => {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const overdue = data.components?.filter(comp => {
            const lastMaintenance = new Date(comp.lastMaintenanceDate);
            return lastMaintenance < sixMonthsAgo;
        }).length || 0;

        setOverdueComponents(overdue);
        setJobsInProgress(data.jobs?.filter(job => job.status === 'In Progress').length || 0);
        setJobsCompleted(data.jobs?.filter(job => job.status === 'Completed').length || 0);
    }, [data]);

    return (
        <div id="dashboard-page" className="page">
            <h2 className="mb-20">Dashboard</h2>
            
            <div className="grid">
                <KpiCard title="Total Ships" value={data.ships?.length || 0} color="#3498db" />
                <KpiCard title="Overdue Components" value={overdueComponents} color="#e74c3c" />
                <KpiCard title="Jobs in Progress" value={jobsInProgress} color="#f39c12" />
                <KpiCard title="Jobs Completed" value={jobsCompleted} color="#2ecc71" />
            </div>
            
            <div className="card">
                <h3 className="mb-20">Recent Maintenance Jobs</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Type</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Scheduled Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.jobs?.slice(0, 5).map(job => (
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{job.type}</td>
                                <td>{job.priority}</td>
                                <td>{job.status}</td>
                                <td>{job.scheduledDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;