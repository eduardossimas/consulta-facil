"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import Avatar from "../../../data/default-avatar.png";

export default function PerfilPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return <p className="p-5 text-center">Redirecionando para login...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Perfil</h1>
      {user.role === "medico" ? (
        <p>Bem vindo, Médico Exemplo</p>
      ) : (
        <p>Bem vindo, Paciente Exemplo</p>
      )}

      {user.role === "medico" ? (
        <div>
          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <Image src={Avatar} alt="Avatar" width={62} height={62} className="rounded-full" />
              <div>
                <p className="text-lg font-semibold">{"Doutor Exemplo"}</p>
                <p className="text-sm text-gray-600">{"medico@example.com"}</p>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <Input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={"Doutor Exemplo"}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={"medico@example.com"}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">CRM</label>
              <Input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={"CRM/SP 123456"}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Especialidade</label>
              <Input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={"Cardiologia"}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Cidade de Atendimento</label>
              <Input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={"São Paulo"}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <Image src={Avatar} alt="Avatar" width={62} height={62} className="rounded-full" />
              <div>
                <p className="text-lg font-semibold">{"Paciente Exemplo"}</p>
                <p className="text-sm text-gray-600">{"paciente@example.com"}</p>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <Input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={"Paciente Exemplo"}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={"paciente@example.com"}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 space-x-4">
        <Button onClick={() => { }}>Salvar</Button>
        <Button onClick={() => { logout(); router.push("/login"); }}>Sair</Button>
      </div>
    </div>
  );
}
