"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher({ teams }: { teams: { name: string; logo: React.ElementType; plan: string }[] }) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  React.useEffect(() => {
    if (teams.length > 0) {
      setActiveTeam(teams[0]); // Garante que o estado reflita a primeira equipe da lista
    }
  }, [teams]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <activeTeam.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{activeTeam?.name}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
