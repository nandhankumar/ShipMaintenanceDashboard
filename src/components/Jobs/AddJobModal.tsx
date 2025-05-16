import React, { useState, useEffect } from 'react';
import { getData } from '../../utils/storage';

interface AddJobModalProps {
    onClose: () => void;
    onSave: (job: {
        componentId: string;
        type: string;
        priority: string;
        status: string;
        assignedEngineerId: string;
        scheduledDate: string;
    }) => void;
}

const AddJobModal: React.FC<AddJobModalProps> = ({ onClose, onSave }) => {
    const [componentId, setComponentId] = useState('');
    const [type, setType] = useState('Inspection');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('Open');
    const [assignedEngineerId, setAssignedEngineerId] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [components, setComponents] = useState<Array<{ id: string; name: string; shipName: string }>>([]);
    const [engineers, setEngineers] = useState<Array<{ id: string; email: string }>>([]);

    useEffect(() => {
        const data = getData();
        
        // Populate components
        const componentsWithShips = data.components?.map(comp => {
            const ship = data.ships?.find(s => s.id === comp.shipId);
            return {
                id: comp.id,
                name: comp.name,
                shipName: ship?.name || 'Unknown'
            };
        }) || [];
        setComponents(componentsWithShips);
        
        // Populate engineers
        const engineerUsers = data.users?.filter(u => u.role === 'Engineer') || [];
        setEngineers(engineerUsers);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            componentId,
            type,
            priority,
            status,
            assignedEngineerId,
            scheduledDate
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Create Maintenance Job</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form id="add-job-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="job-component">Component</label>
                        <select 
                            id="job-component" 
                            required
                            value={componentId}
                            onChange={(e) => setComponentId(e.target.value)}
                        >
                            <option value="">Select Component</option>
                            {components.map(comp => (
                                <option key={comp.id} value={comp.id}>
                                    {comp.name} (Ship: {comp.shipName})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="job-type">Type</label>
                        <select 
                            id="job-type" 
                            required
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="Inspection">Inspection</option>
                            <option value="Repair">Repair</option>
                            <option value="Replacement">Replacement</option>
                            <option value="Upgrade">Upgrade</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="job-priority">Priority</label>
                        <select 
                            id="job-priority" 
                            required
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="job-status">Status</label>
                        <select 
                            id="job-status" 
                            required
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="job-engineer">Assigned Engineer</label>
                        <select 
                            id="job-engineer" 
                            required
                            value={assignedEngineerId}
                            onChange={(e) => setAssignedEngineerId(e.target.value)}
                        >
                            <option value="">Select Engineer</option>
                            {engineers.map(eng => (
                                <option key={eng.id} value={eng.id}>{eng.email}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="job-scheduled-date">Scheduled Date</label>
                        <input 
                            type="date" 
                            id="job-scheduled-date" 
                            required
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJobModal;