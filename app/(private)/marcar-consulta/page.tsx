"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import useProfessionals from '@/hooks/useProfessionals';

export default function Page() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        doctorId: "",
        date: "",
        time: ""
    });

    const { professionals, isLoading, error } = useProfessionals();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/consulta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    paciente_id: 1,
                    profissional_id: 1,
                    data_hora: `${formData.date}T${formData.time}:00`,
                    status: "Pendente",
                }),
            });

            if (!response.ok) {
                throw new Error("Erro ao marcar consulta");
            }

            alert("Consulta marcada com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Falha ao marcar consulta.");
        }
    };

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
                            <BreadcrumbPage>Marcar Consulta</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome do Paciente</label>
                            <Input
                                id="name"
                                type="text"
                                required
                                className="mt-1 block w-full"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Selecione o Doutor</label>
                            <Select value={formData.doctorId} onValueChange={(value) => setFormData({ ...formData, doctorId: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione um doutor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {isLoading ? (
                                        <SelectItem value="loading" disabled>Carregando...</SelectItem>
                                    ) : error ? (
                                        <SelectItem value="error" disabled>Erro ao carregar doutores</SelectItem>
                                    ) : (
                                        professionals.map((professional: { id: string; nome: string }) => (
                                            <SelectItem key={professional.id} value={professional.nome}>
                                                {professional.nome}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Data da Consulta</label>
                            <Input
                                id="date"
                                type="date"
                                required
                                className="mt-1 block w-full"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Hora da Consulta</label>
                            <Input
                                id="time"
                                type="time"
                                required
                                className="mt-1 block w-full"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Marcar Consulta
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}