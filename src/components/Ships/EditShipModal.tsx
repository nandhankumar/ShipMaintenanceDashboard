import React, { useState } from 'react';

interface EditShipModalProps {
    ship: {
        id: string;
        name: string;
        imo: string;
        flag: string;
        status: string;
    };
    onClose: () => void;
    onSave: (ship: { id: string; name: string; imo: string; flag: string; status: string }) => void;
}

const EditShipModal: React.FC<EditShipModalProps> = ({ ship, onClose, onSave }) => {
    const [name, setName] = useState(ship.name);
    const [imo, setImo] = useState(ship.imo);
    const [flag, setFlag] = useState(ship.flag);
    const [status, setStatus] = useState(ship.status);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: ship.id, name, imo, flag, status });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Edit Ship</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form id="edit-ship-form" onSubmit={handleSubmit}>
                    <input type="hidden" id="edit-ship-id" value={ship.id} />
                    <div className="form-group">
                        <label htmlFor="edit-ship-name">Name</label>
                        <input 
                            type="text" 
                            id="edit-ship-name" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-ship-imo">IMO Number</label>
                        <input 
                            type="text" 
                            id="edit-ship-imo" 
                            required
                            value={imo}
                            onChange={(e) => setImo(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-ship-flag">Flag</label>
                        <input 
                            type="text" 
                            id="edit-ship-flag" 
                            required
                            value={flag}
                            onChange={(e) => setFlag(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-ship-status">Status</label>
                        <select 
                            id="edit-ship-status" 
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

export default EditShipModal;