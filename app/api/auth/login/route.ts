import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "medico" | "paciente";
}

const usersFilePath = path.join(process.cwd(), "data", "users.json");

const loadUsers = (): User[] => {
  const fileContent = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(fileContent);
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const users = loadUsers();

    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      role: user.role,
      token: `fake-token-${user.id}`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
