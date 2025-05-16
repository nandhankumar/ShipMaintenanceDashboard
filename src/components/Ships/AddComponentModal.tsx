import React, { useState } from 'react';

interface AddComponentModalProps {
    shipId: string;
    onClose: () => void;
    onSave: (component: {
        name: string;
        serialNumber: string;
        installDate: string;
        lastMaintenanceDate: string;
    }) => void;
}

const AddComponentModal: React.FC<AddComponentModalProps> = ({ shipId, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [installDate, setInstallDate] = useState('');
    const [lastMaintenanceDate, setLastMaintenanceDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            name,
            serialNumber,
            installDate,
            lastMaintenanceDate
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Add New Component</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form id="add-component-form" onSubmit={handleSubmit}>
                    <input type="hidden" id="component-ship-id" value={shipId} />
                    <div className="form-group">
                        <label htmlFor="component-name">Name</label>
                        <input 
                            type="text" 
                            id="component-name" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="component-serial">Serial Number</label>
                        <input 
                            type="text" 
                            id="component-serial" 
                            required
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="component-install-date">Installation Date</label>
                        <input 
                            type="date" 
                            id="component-install-date" 
                            required
                            value={installDate}
                            onChange={(e) => setInstallDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="component-last-maintenance">Last Maintenance Date</label>
                        <input 
                            type="date" 
                            id="component-last-maintenance" 
                            required
                            value={lastMaintenanceDate}
                            onChange={(e) => setLastMaintenanceDate(e.target.value)}
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

export default AddComponentModal;