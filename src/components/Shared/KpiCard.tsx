import React from 'react';

interface KpiCardProps {
    title: string;
    value: number;
    color: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, color }) => {
    return (
        <div className="kpi-card" style={{ backgroundColor: color }}>
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
};

export default KpiCard;