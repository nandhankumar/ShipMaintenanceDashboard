import React from 'react';

interface NotificationItemProps {
    notification: {
        id: string;
        type: string;
        message: string;
        read: boolean;
        timestamp: string;
    };
    onMarkAsRead: (id: string) => void;
    onDismiss: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
    notification, 
    onMarkAsRead, 
    onDismiss 
}) => {
    return (
        <div className={`notification ${notification.read ? '' : 'unread'}`}>
            <h3>{notification.type}</h3>
            <p>{notification.message}</p>
            <small>{new Date(notification.timestamp).toLocaleString()}</small>
            <div className="notification-actions">
                {!notification.read && (
                    <button 
                        className="btn btn-primary" 
                        onClick={() => onMarkAsRead(notification.id)}
                    >
                        Mark as Read
                    </button>
                )}
                <button 
                    className="btn btn-danger" 
                    onClick={() => onDismiss(notification.id)}
                >
                    Dismiss
                </button>
            </div>
        </div>
    );
};

export default NotificationItem;