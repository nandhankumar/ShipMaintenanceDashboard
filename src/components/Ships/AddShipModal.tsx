import React, { useState } from 'react';

interface AddShipModalProps {
    onClose: () => void;
    onSave: (ship: { name: string; imo: string; flag: string; status: string }) => void;
}

const AddShipModal: React.FC<AddShipModalProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [imo, setImo] = useState('');
    const [flag, setFlag] = useState('');
    const [status, setStatus] = useState('Active');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, imo, flag, status });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Add New Ship</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form id="add-ship-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="ship-name">Name</label>
                        <input 
                            type="text" 
                            id="ship-name" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ship-imo">IMO Number</label>
                        <input 
                            type="text" 
                            id="ship-imo" 
                            required
                            value={imo}
                            onChange={(e) => setImo(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ship-flag">Flag</label>
                        <input 
                            type="text" 
                            id="ship-flag" 
                            required
                            value={flag}
                            onChange={(e) => setFlag(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ship-status">Status</label>
                        <select 
                            id="ship-status" 
                            required
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Active">Active</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                            <option value="Inactive">Inactive</option>
                        </select>
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

export default AddShipModal;