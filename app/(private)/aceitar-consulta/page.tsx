"use client"

import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ConsultList from "@/components/consult-list";
import useConsults from '@/hooks/useConsults';

export default function Page() {
    const { consults, isLoading, error } = useConsults(1); // Substitua 1 pelo ID do paciente

    // Função para atualizar o status da consulta
    const handleUpdateStatus = async (consultationId: number, status: string) => {
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

            // Atualiza o estado local das consultas
            // Recarrega a página após atualizar o status
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar o status:', error);
        }
    };

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex flex-col flex-1 w-full">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Aceitar Consultas</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Aceitar Consultas</h1>
                <p className="text-gray-600">Aqui você pode aceitar as consultas marcadas pelos pacientes.</p>
                <ConsultList 
                    consultations={consults} 
                    patients={[]} 
                    includeStatus={["Pendente"]} 
                    onUpdateStatus={handleUpdateStatus}
                />
            </div>
        </div>
    );
}