import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import useProfessionals from '@/hooks/useProfessionals';

interface Professional {
    id: number;
    nome: string;
    specialty: string;
    city: string;
    crm: string;
    description: string;
    imageUrl: string;
}

export default function ProfessionalsList() {
    const { professionals, isLoading, error } = useProfessionals();
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth < 640) {
                setItemsPerPage(3);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(4);
            } else {
                setItemsPerPage(5);
            }
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, []);

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const filteredProfessionals = professionals.filter((professional: Professional) =>
        (professional.nome && professional.nome.toLowerCase().includes(filter.toLowerCase())) ||
        (professional.specialty && professional.specialty.toLowerCase().includes(filter.toLowerCase())) ||
        (professional.city && professional.city.toLowerCase().includes(filter.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredProfessionals.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProfessionals = filteredProfessionals.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Input
                    type="text"
                    placeholder="Filtrar por nome, especialidade ou cidade"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full"
                />
            </div>
            <ul role="list" className="divide-y divide-gray-100">
                {currentProfessionals.map((professional: Professional, index: number) => (
                    <li key={index} className="flex justify-between gap-x-6 py-5">
                        <div className="flex items-center gap-x-4">
                            <img alt="" src={professional.imageUrl} className="w-16 h-16 rounded-full bg-gray-50" />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{professional.nome}</p>
                                <p className="text-xs text-gray-500">{professional.crm}</p>
                                <p className="text-xs text-gray-500">{professional.specialty}</p>
                                <p className="text-xs text-gray-500">{professional.city}</p>
                            </div>
                        </div>
                        <div className="flex-1 text-sm text-gray-900">{professional.description}</div>
                        <div className="flex items-center">
                            <Button onClick={() => window.location.href = '/marcar-consulta'}>Marcar Consulta</Button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
                <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Anterior
                </Button>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Próxima
                </Button>
            </div>
        </div>
    );
}