"use client";

import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useConsults from '@/hooks/useConsults';
import { format } from "date-fns";

export default function Page() {
  const { consults, isLoading, error } = useConsults(1); // Substitua 1 pelo ID do paciente

  type Consult = {
    status: "Pendente" | "Agendado" | "Finalizado" | "Em Aberto";
    data_hora: string; 
  };

  const [nextConsult, setNextConsult] = useState<Consult | null>(null);

  useEffect(() => {
    if (consults && consults.length > 0) {
      const upcoming = consults
        .filter((consult: Consult) => consult.status === "Agendado")
        .sort((a: Consult, b: Consult) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime())[0];

      setNextConsult(upcoming || null);
    }
  }, [consults]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const pendingConsults = consults.filter((consult: Consult) => consult.status === "Pendente").length;
  const scheduledConsults = consults.filter((consult: Consult) => consult.status === "Agendado").length;
  const finalizedConsults = consults.filter((consult: Consult) => consult.status === "Finalizada").length;

  return (
    <div className="flex flex-col flex-1 w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Bem-vindo!</h1>
        <p className="text-muted-foreground">
          Aqui você pode acompanhar suas consultas e verificar informações importantes.
        </p>

        {/* Próxima consulta */}
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-bold text-blue-700">Próxima Consulta</h2>
          {nextConsult ? (
            <p className="text-blue-600">
              Sua próxima consulta está agendada para{" "}
              <span className="font-semibold">
                {nextConsult.data_hora ? format(new Date(nextConsult.data_hora), "dd/MM/yyyy 'às' HH:mm") : "Data não disponível"}
              </span>.
            </p>
          ) : (
            <p className="text-blue-600">Você não tem consultas agendadas no momento.</p>
          )}
        </div>

        {/* Cards de status das consultas */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <div>
              <h2 className="text-xl font-bold">Consultas Pendentes</h2>
              <p className="text-2xl">{pendingConsults}</p>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <div>
              <h2 className="text-xl font-bold">Consultas Agendadas</h2>
              <p className="text-2xl">{scheduledConsults}</p>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <div>
              <h2 className="text-xl font-bold">Consultas Finalizadas</h2>
              <p className="text-2xl">{finalizedConsults}</p>
            </div>
          </div>
        </div>

        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </div>
  );
}