import React, { useState, useEffect } from 'react';
import { getData } from '../../utils/storage';

interface UpdateJobModalProps {
    jobId: string;
    onClose: () => void;
    onSave: (jobId: string, status: string) => void;
}

const UpdateJobModal: React.FC<UpdateJobModalProps> = ({ jobId, onClose, onSave }) => {
    const [status, setStatus] = useState('Open');
    
    useEffect(() => {
        const data = getData();
        const job = data.jobs?.find(j => j.id === jobId);
        if (job) {
            setStatus(job.status);
        }
    }, [jobId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(jobId, status);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Update Job Status</h3>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <form id="update-job-form" onSubmit={handleSubmit}>
                    <input type="hidden" id="update-job-id" value={jobId} />
                    <div className="form-group">
                        <label htmlFor="update-job-status">Status</label>
                        <select 
                            id="update-job-status" 
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
                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateJobModal;