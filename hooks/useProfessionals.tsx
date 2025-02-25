import { useState, useEffect } from 'react';

const useProfessionals = () => {
    const [professionals, setProfessionals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/profissional');
                if (!response.ok) {
                    throw new Error('Erro ao carregar os profissionais');
                }
                const data = await response.json();
                setProfessionals(data);
            } catch (err) {
                setError('Falha ao carregar os profissionais.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfessionals();
    }, []);

    return { professionals, isLoading, error };
};

export default useProfessionals;