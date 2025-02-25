import React from 'react';
import { useRouter } from 'next/router';
import StatusIndicator from './status-indicator';
import useProfessionals from '@/hooks/useProfessionals';
import useConsultActions from '@/hooks/useConsultsActions';
import { Button } from './ui/button';
import { useAuth } from "@/context/AuthContext"

interface Doctor {
    id: number;
    nome: string;
    crm: string;
    especialidade: string;
    cidade: string;
    imageUrl: string;
    description: string;
}

interface Patient {
    id: number;
    name: string;
    email: string;
}

interface Consultation {
    doctor: Doctor;
    patient: Patient;
    date: string;
    status: string;
}

interface Consult {
    id: number;
    status: string;
    data_hora: string;
    paciente_id: number;
    profissional_id: number;
}

interface ConsultListProps {
    consultations: Consult[];
    patients: Patient[];
    includeStatus?: string[];
    onUpdateStatus?: (consultationId: number, status: string) => void;
}

export default function ConsultList({
    consultations,
    patients,
    includeStatus = [],
    onUpdateStatus,
}: ConsultListProps) {
    const { professionals: doctors = [], isLoading, error } = useProfessionals();
    const { updateConsultStatus, isLoading: isLoadingUpdate, error: errorUpdate } = useConsultActions();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleUpdateStatus = async (consultationId: number, status: string) => {
        try {
            await updateConsultStatus(consultationId, status);

            // Notifica o componente pai sobre a atualização
            if (onUpdateStatus) {
                onUpdateStatus(consultationId, status);
            }
        } catch (error) {
            console.error('Erro ao atualizar o status:', error);
        }
    };

    // Garante que consultations seja um array
    const consultationsArray = Array.isArray(consultations) ? consultations : [consultations];
    console.log(consultationsArray);

    // Mapeia os dados para o formato esperado pelo componente
    const mappedConsultations = consultationsArray.map((consultation) => {
        const doctor = doctors.find((doc: Doctor) => doc.id === consultation.profissional_id);
        const patient = patients.find((pat) => pat.id === consultation.paciente_id);

        return {
            doctor: doctor || { id: 0, nome: 'Desconhecido', crm: '', especialidade: '', cidade: '', imageUrl: '', description: '' },
            patient: patient || { id: 0, name: 'Paciente', email: 'paciente@example.com' },
            date: consultation.data_hora,
            status: consultation.status,
            id: consultation.id,
        };
    });

    const filteredConsultations = mappedConsultations.filter((consultation) => includeStatus.includes(consultation.status));

    const { user, logout } = useAuth();

    return (
        <ul role="list" className="divide-y divide-gray-100">
            {filteredConsultations.map((consultation, index) => (
                <li key={index} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <img
                            alt=""
                            src={consultation.doctor.imageUrl || 'default-image.jpg'} // Placeholder em caso de imagem não disponível
                            className="size-12 flex-none rounded-full bg-gray-50"
                        />
                        <div className="min-w-0 flex-auto flex flex-row gap-y-1">
                            <div>
                                <p className="text-sm/6 font-semibold text-gray-900">{consultation.doctor.nome}</p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">{consultation.doctor.especialidade}</p>
                                <p className="mt-1 truncate text-xs/5 text-gray-500">{consultation.doctor.crm}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="mt-2 text-sm/6 text-gray-900">Paciente: {consultation.patient.name}</p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">{consultation.patient.email}</p>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm/6 text-gray-900">
                            Data: <time dateTime={consultation.date}>{new Date(consultation.date).toLocaleString([], { day: 'numeric', month: "long", year: "numeric", hour: '2-digit', minute: '2-digit' })}</time>
                        </p>
                        <StatusIndicator status={consultation.status} />
                    </div>
                    {
                        consultation.status === 'Pendente' && user && user.role === "medico" && (
                            <div className='flex gap-2'>
                                <Button
                                    type="button"
                                    onClick={() => onUpdateStatus && onUpdateStatus(consultation.id, 'Agendado')}
                                >
                                    Aceitar
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => onUpdateStatus && onUpdateStatus(consultation.id, 'Cancelada')}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        )
                    }
                </li>
            ))}
        </ul>
    );
}