import React, { useState, useEffect } from 'react';
import { getData, saveData } from '../utils/storage';
import NotificationItem from './Shared/NotificationItem';

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Array<{
        id: string;
        type: string;
        message: string;
        read: boolean;
        timestamp: string;
    }>>([]);

    useEffect(() => {
        const data = getData();
        // Sort by timestamp (newest first)
        const sorted = [...data.notifications].sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setNotifications(sorted);
    }, []);

    const markAsRead = (notificationId: string) => {
        const data = getData();
        const notifIndex = data.notifications.findIndex(n => n.id === notificationId);
        
        if (notifIndex !== -1) {
            data.notifications[notifIndex].read = true;
            saveData(data);
            setNotifications(prev => prev.map(n => 
                n.id === notificationId ? { ...n, read: true } : n
            ));
        }
    };

    const dismissNotification = (notificationId: string) => {
        const data = getData();
        data.notifications = data.notifications.filter(n => n.id !== notificationId);
        saveData(data);
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
    };

    return (
        <div id="notifications-page" className="page">
            <h2 className="mb-20">Notifications</h2>
            
            <div className="card">
                {notifications.length === 0 ? (
                    <p>No notifications</p>
                ) : (
                    notifications.map(notification => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onMarkAsRead={markAsRead}
                            onDismiss={dismissNotification}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications;