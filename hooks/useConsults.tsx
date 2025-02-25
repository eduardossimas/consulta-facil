"use client";

import { useState, useEffect } from "react";

interface Consult {
    id: number;
    status: string;
    data_hora: string;
    paciente_id: number;
    profissional_id: number;
}

const useConsults = (patientId: number) => {
    const [consults, setConsults] = useState<Consult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchConsults = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/consulta`);
                const data = await response.json();
                setConsults(data);
            } catch (err) {
                setError("Erro ao carregar consultas");
            } finally {
                setIsLoading(false);
            }
        };

        fetchConsults();
    }, [patientId]);

    return { consults, isLoading, error };
};

export default useConsults;