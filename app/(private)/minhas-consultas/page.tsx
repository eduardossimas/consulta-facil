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
import { Button } from "@/components/ui/button";
import ConsultList from "@/components/consult-list";
import useConsults from "@/hooks/useConsults";

export default function Page() {
    const { consults, isLoading, error } = useConsults(1); // Substitua 1 pelo ID do paciente

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
                            <BreadcrumbPage>Minhas Consultas</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Minhas Consultas</h1>
                <p className="text-gray-600">Aqui você pode visualizar todas as suas consultas agendadas. O status de "Pendente" requer que o médico aceite a consulta.</p>
                <Button onClick={() => window.location.href = '/marcar-consulta'} className="mt-4 w-min">Marcar Nova Consulta</Button>
                <ConsultList consultations={consults} includeStatus={["Agendado", "Pendente", "Cancelada"]} patients={[]} />
            </div>
        </div>
    );
}