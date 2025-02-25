"use client"

import Link from "next/link"
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  BookUser,
  Bot,
  Calendar,
  Command,
  Frame,
  GalleryVerticalEnd,
  icons,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  BriefcaseMedical,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"

// This is sample data.
const data = {
  user: {
    name: "ADMIN",
    email: "admin@email.com",
    avatar: "/avatars/shadcn.jpg",
  },
  agendamento: [
    {
      title: "Agendamentos",
      url: "#",
      icon: Calendar,
      isActive: true,
      items: [
        {
          title: "Marcar Consulta",
          url: "/marcar-consulta",
        },
        {
          title: "Minhas Consultas",
          url: "/minhas-consultas",
        },
        {
          title: "Histórico",
          url: "/historico-consultas",
        },
      ],
    },
    {
      title: "Profissionais",
      url: "#",
      icon: BookUser,
      items: [
        {
          title: "Listar Profissionais",
          url: "/listar-profissionais",
        },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Perfil",
          url: "/perfil",
        }
      ],
    }
  ],
  buscar: [
    {
      name: "Buscar",
      url: "#",
      icon: BookUser,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth();

  // Adiciona a opção "Aceitar Consulta" apenas se o usuário for médico e se ainda não estiver presente
  if (user && user.role === "medico") {
    const aceitarConsultaExists = data.agendamento[0].items.some(item => item.title === "Aceitar Consultas");
    if (!aceitarConsultaExists) {
      data.agendamento[0].items.push({
        title: "Aceitar Consultas",
        url: "/aceitar-consulta",
      });
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={[
            {
              logo: BriefcaseMedical,
              name: "ConsultaFácil",
              plan: "ConsultaFácil",
            },
          ]}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.agendamento} />
        {/* <NavProjects buscar={data.buscar} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}