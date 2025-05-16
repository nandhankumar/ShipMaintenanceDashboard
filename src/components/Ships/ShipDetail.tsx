import React, { useState, useEffect } from 'react';
import { getData, saveData, addNotification } from '../../utils/storage';
import AddComponentModal from './AddComponentModal';

interface ShipDetailProps {
    shipId: string;
    backToShips: () => void;
}

const ShipDetail: React.FC<ShipDetailProps> = ({ shipId, backToShips }) => {
    const data = getData();
    const ship = data.ships.find(s => s.id === shipId);
    const [components, setComponents] = useState(data.components.filter(c => c.shipId === shipId) || []);
    const [jobs, setJobs] = useState<Array<{
        id: string;
        componentId: string;
        type: string;
        priority: string;
        status: string;
        scheduledDate: string;
    }>>([]);
    const [showAddComponentModal, setShowAddComponentModal] = useState(false);

    useEffect(() => {
        const data = getData();
        const shipJobs = data.jobs?.filter(job => {
            const component = data.components?.find(c => c.id === job.componentId);
            return component?.shipId === shipId;
        }) || [];
        setJobs(shipJobs);
    }, [shipId]);

    const refreshComponents = () => {
        const newData = getData();
        setComponents(newData.components.filter(c => c.shipId === shipId) || []);
    };

    const handleAddComponent = (newComponent: {
        name: string;
        serialNumber: string;
        installDate: string;
        lastMaintenanceDate: string;
    }) => {
        const data = getData();
        const component = {
            id: 'c' + (data.components.length + 1),
            shipId: shipId,
            ...newComponent
        };
        data.components.push(component);
        saveData(data);
        addNotification(`New component added to ship: ${component.name}`, 'System');
        refreshComponents();
        setShowAddComponentModal(false);
    };

    const deleteComponent = (componentId: string) => {
        if (!window.confirm('Are you sure you want to delete this component? All associated jobs will also be deleted.')) {
            return;
        }

        const data = getData();
        const component = data.components.find(c => c.id === componentId);
        
        if (!component) return;
        
        // Remove component
        data.components = data.components.filter(c => c.id !== componentId);
        
        // Remove jobs associated with this component
        data.jobs = data.jobs.filter(j => j.componentId !== componentId);
        
        saveData(data);
        addNotification(`Component deleted: ${component.name}`, 'System');
        refreshComponents();
        
        // Refresh jobs list
        const shipJobs = data.jobs?.filter(job => {
            const comp = data.components?.find(c => c.id === job.componentId);
            return comp?.shipId === shipId;
        }) || [];
        setJobs(shipJobs);
    };

    if (!ship) {
        return (
            <div className="page">
                <p>Ship not found</p>
                <button className="btn btn-secondary" onClick={backToShips}>Back to Ships</button>
            </div>
        );
    }

    return (
        <div id="ship-detail-page" className="page">
            <button className="btn btn-secondary mb-20" onClick={backToShips}>Back to Ships</button>
            <h2 className="mb-20">{ship.name}</h2>
            
            <div className="grid">
                <div className="card">
                    <h3 className="mb-20">General Information</h3>
                    <div className="ship-info">
                        <p><strong>IMO Number:</strong> {ship.imo}</p>
                        <p><strong>Flag:</strong> {ship.flag}</p>
                        <p><strong>Status:</strong> {ship.status}</p>
                    </div>
                </div>
                
                <div className="card">
                    <div className="flex-between mb-20">
                        <h3>Components</h3>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => setShowAddComponentModal(true)}
                        >
                            Add Component
                        </button>
                    </div>
                    <table id="components-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Serial Number</th>
                                <th>Installation Date</th>
                                <th>Last Maintenance</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {components.map(comp => (
                                <tr key={comp.id}>
                                    <td>{comp.name}</td>
                                    <td>{comp.serialNumber}</td>
                                    <td>{comp.installDate}</td>
                                    <td>{comp.lastMaintenanceDate}</td>
                                    <td>
                                        {data.currentUser?.role === 'Admin' && (
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={() => deleteComponent(comp.id)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="card mt-20">
                <h3 className="mb-20">Maintenance History</h3>
                <table id="ship-jobs-table">
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Component</th>
                            <th>Type</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Scheduled Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => {
                            const component = data.components?.find(c => c.id === job.componentId);
                            return (
                                <tr key={job.id}>
                                    <td>{job.id}</td>
                                    <td>{component?.name || 'N/A'}</td>
                                    <td>{job.type}</td>
                                    <td>{job.priority}</td>
                                    <td>{job.status}</td>
                                    <td>{job.scheduledDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {showAddComponentModal && (
                <AddComponentModal 
                    shipId={shipId}
                    onClose={() => setShowAddComponentModal(false)}
                    onSave={handleAddComponent}
                />
            )}
        </div>
    );
};

export default ShipDetail;