// hooks/useConsultActions.ts
import { useState } from "react";

const useConsultActions = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateConsultStatus = async (consultationId: number, status: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/consulta/${consultationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao atualizar o status da consulta');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao atualizar o status da consulta:', error);
            throw error;
        }
    };

    return { updateConsultStatus, isLoading, error };
};

export default useConsultActions;