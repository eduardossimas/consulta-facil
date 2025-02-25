"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { login } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);
    if (success) {
      router.push("/home");
    } else {
      setError("E-mail ou senha incorretos!");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="text-teal-950">
        <CardHeader>
          <CardTitle className="text-2xl">Bem-vindo de volta! 👋</CardTitle>
          <CardDescription>
            Insira seu e-mail e senha para entrar na sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
              <Button variant="outline" className="w-full">
                Entrar com o Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Não possui uma conta?{" "}
              <a href="#" className="underline underline-offset-4">
                Cadastre-se
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
