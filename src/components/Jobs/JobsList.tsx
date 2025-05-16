import React, { useState } from 'react';
import { getData, saveData, addNotification } from '../../utils/storage';
import AddJobModal from './AddJobModal';
import UpdateJobModal from './UpdateJobModal';

const JobsList: React.FC = () => {
    const data = getData();
    const [jobs, setJobs] = useState(data.jobs || []);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentJobId, setCurrentJobId] = useState('');

    const refreshData = () => {
        const newData = getData();
        setJobs(newData.jobs || []);
    };

    const handleAddJob = (newJob: {
        componentId: string;
        type: string;
        priority: string;
        status: string;
        assignedEngineerId: string;
        scheduledDate: string;
    }) => {
        const data = getData();
        const component = data.components?.find(c => c.id === newJob.componentId);
        
        const job = {
            id: 'j' + (data.jobs.length + 1),
            componentId: newJob.componentId,
            shipId: component?.shipId,
            type: newJob.type,
            priority: newJob.priority,
            status: newJob.status,
            assignedEngineerId: newJob.assignedEngineerId,
            scheduledDate: newJob.scheduledDate
        };
        
        data.jobs.push(job);
        saveData(data);
        addNotification(`New maintenance job created: ${job.type}`, 'System');
        refreshData();
        setShowAddModal(false);
    };

    const prepareUpdateJob = (jobId: string) => {
        setCurrentJobId(jobId);
        setShowUpdateModal(true);
    };

    const handleUpdateJob = (newStatus: string) => {
        const data = getData();
        const jobIndex = data.jobs.findIndex(j => j.id === currentJobId);
        
        if (jobIndex !== -1) {
            const oldStatus = data.jobs[jobIndex].status;
            data.jobs[jobIndex].status = newStatus;
            saveData(data);
            addNotification(`Job ${currentJobId} status changed from ${oldStatus} to ${newStatus}`, 'System');
            refreshData();
            setShowUpdateModal(false);
        }
    };

    return (
        <div id="jobs-page" className="page">
            <div className="flex-between mb-20">
                <h2>Maintenance Jobs</h2>
                <button 
                    id="add-job-btn" 
                    className="btn btn-primary" 
                    onClick={() => setShowAddModal(true)}
                >
                    Create New Job
                </button>
            </div>
            
            <div className="card">
                <table id="jobs-table">
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Ship</th>
                            <th>Component</th>
                            <th>Type</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Assigned Engineer</th>
                            <th>Scheduled Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => {
                            const component = data.components?.find(c => c.id === job.componentId);
                            const ship = component ? data.ships?.find(s => s.id === component.shipId) : null;
                            const engineer = data.users?.find(u => u.id === job.assignedEngineerId);
                            
                            return (
                                <tr key={job.id}>
                                    <td>{job.id}</td>
                                    <td>{ship?.name || 'N/A'}</td>
                                    <td>{component?.name || 'N/A'}</td>
                                    <td>{job.type}</td>
                                    <td>{job.priority}</td>
                                    <td>{job.status}</td>
                                    <td>{engineer?.email || 'Unassigned'}</td>
                                    <td>{job.scheduledDate}</td>
                                    <td>
                                        {data.currentUser?.role === 'Engineer' && job.status !== 'Completed' && (
                                            <button 
                                                className="btn btn-primary update-job-btn" 
                                                onClick={() => prepareUpdateJob(job.id)}
                                            >
                                                Update
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {showAddModal && (
                <AddJobModal 
                    onClose={() => setShowAddModal(false)} 
                    onSave={handleAddJob} 
                />
            )}

            {showUpdateModal && (
                <UpdateJobModal 
                    onClose={() => setShowUpdateModal(false)}
                    onSave={handleUpdateJob} jobId={''}                />
            )}
        </div>
    );
};

export default JobsList;