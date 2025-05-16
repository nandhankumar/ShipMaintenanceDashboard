import React, { useState } from 'react';
import { getData, saveData, addNotification } from '../../utils/storage';
import AddShipModal from './AddShipModal';
import EditShipModal from './EditShipModal';

interface ShipsListProps {
    viewShip: (shipId: string) => void;
}

const ShipsList: React.FC<ShipsListProps> = ({ viewShip }) => {
    const data = getData();
    const [ships, setShips] = useState(data.ships || []);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentShip, setCurrentShip] = useState<{ id: string; name: string; imo: string; flag: string; status: string } | null>(null);

    const refreshData = () => {
        const newData = getData();
        setShips(newData.ships || []);
    };

    const handleAddShip = (newShip: { name: string; imo: string; flag: string; status: string }) => {
        const data = getData();
        const ship = {
            id: 's' + (data.ships.length + 1),
            ...newShip
        };
        data.ships.push(ship);
        saveData(data);
        addNotification(`New ship added: ${ship.name}`, 'System');
        refreshData();
        setShowAddModal(false);
    };

    const editShip = (shipId: string) => {
        const ship = ships.find(s => s.id === shipId);
        if (ship) {
            setCurrentShip(ship);
            setShowEditModal(true);
        }
    };

    const handleEditShip = (updatedShip: { id: string; name: string; imo: string; flag: string; status: string }) => {
        const data = getData();
        const shipIndex = data.ships.findIndex(s => s.id === updatedShip.id);
        
        if (shipIndex !== -1) {
            data.ships[shipIndex] = updatedShip;
            saveData(data);
            addNotification(`Ship updated: ${updatedShip.name}`, 'System');
            refreshData();
            setShowEditModal(false);
        }
    };

    const deleteShip = (shipId: string) => {
        if (!window.confirm('Are you sure you want to delete this ship? All associated components and jobs will also be deleted.')) {
            return;
        }

        const data = getData();
        const ship = data.ships.find(s => s.id === shipId);
        
        if (!ship) return;
        
        // Remove ship
        data.ships = data.ships.filter(s => s.id !== shipId);
        
        // Remove components associated with this ship
        data.components = data.components.filter(c => c.shipId !== shipId);
        
        // Remove jobs associated with components of this ship
        const componentIds = data.components.filter(c => c.shipId === shipId).map(c => c.id);
        data.jobs = data.jobs.filter(j => !componentIds.includes(j.componentId));
        
        saveData(data);
        addNotification(`Ship deleted: ${ship.name}`, 'System');
        refreshData();
    };

    return (
        <div id="ships-page" className="page">
            <div className="flex-between mb-20">
                <h2>Ships Management</h2>
                <button 
                    id="add-ship-btn" 
                    className="btn btn-primary" 
                    onClick={() => setShowAddModal(true)}
                >
                    Add New Ship
                </button>
            </div>
            
            <div className="card">
                <table id="ships-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>IMO Number</th>
                            <th>Flag</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ships.map(ship => (
                            <tr key={ship.id}>
                                <td>{ship.name}</td>
                                <td>{ship.imo}</td>
                                <td>{ship.flag}</td>
                                <td>{ship.status}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary view-ship-btn" 
                                        onClick={() => viewShip(ship.id)}
                                    >
                                        View
                                    </button>
                                    {data.currentUser?.role === 'Admin' && (
                                        <>
                                            <button 
                                                className="btn btn-secondary edit-ship-btn" 
                                                onClick={() => editShip(ship.id)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="btn btn-danger delete-ship-btn" 
                                                onClick={() => deleteShip(ship.id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddModal && (
                <AddShipModal 
                    onClose={() => setShowAddModal(false)} 
                    onSave={handleAddShip} 
                />
            )}

            {showEditModal && currentShip && (
                <EditShipModal 
                    ship={currentShip} 
                    onClose={() => setShowEditModal(false)} 
                    onSave={handleEditShip} 
                />
            )}
        </div>
    );
};

export default ShipsList;