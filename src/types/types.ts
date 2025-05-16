export interface User {
    id: string;
    role: string;
    email: string;
    password: string;
}

export interface Ship {
    id: string;
    name: string;
    imo: string;
    flag: string;
    status: string;
}

export interface Component {
    id: string;
    shipId: string;
    name: string;
    serialNumber: string;
    installDate: string;
    lastMaintenanceDate: string;
}

export interface Job {
    id: string;
    componentId: string;
    shipId?: string;
    type: string;
    priority: string;
    status: string;
    assignedEngineerId: string;
    scheduledDate: string;
}

export interface Notification {
    id: string;
    type: string;
    message: string;
    read: boolean;
    timestamp: string;
}

export interface AppData {
    users: User[];
    ships: Ship[];
    components: Component[];
    jobs: Job[];
    notifications: Notification[];
    currentUser: User | null;
}

export interface CurrentView {
    currentShipId: string | null;
    currentMonth: number;
    currentYear: number;
}