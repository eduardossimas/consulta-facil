import React from 'react';

const statusColors: { [key: string]: string } = {
    Agendado: 'bg-green-500',
    Pendente: 'bg-yellow-500',
    Finalizada: 'bg-gray-500',
    Cancelada: 'bg-red-500',
};

export default function StatusIndicator({ status }: { status: string }) {
    const colorClass = statusColors[status] || 'bg-gray-500';

    return (
        <div className="flex items-center">
            <span className={`inline-block w-2.5 h-2.5 mr-2 rounded-full ${colorClass}`}></span>
            <span className="text-sm font-medium text-gray-900">{status}</span>
        </div>
    );
}