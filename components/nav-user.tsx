"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export function NavUser() {
  const { user, logout } = useAuth();
  const { isMobile } = useSidebar();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={"../../../data/default-avatar.png"} alt={user.name} />
                {user.role === "medico" ? (
                  <AvatarFallback className="rounded-lg">ME</AvatarFallback>
                ) : (
                  <AvatarFallback className="rounded-lg">PE</AvatarFallback>
                )}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {user.role === "medico" ? (
                  <span className="truncate font-semibold">Medico Exemplo</span>
                ) : (
                  <span className="truncate font-semibold">Paciente Exemplo</span>
                )}
                {user.role === "medico" ? (
                  <span className="truncate text-xs">medico@example.com</span>
                ) : (
                  <span className="truncate text-xs">paciente@example.com</span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={""} alt={user.name} />
                  {user.role === "medico" ? (
                    <AvatarFallback className="rounded-lg">ME</AvatarFallback>
                  ) : (
                    <AvatarFallback className="rounded-lg">PE</AvatarFallback>
                  )}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {user.role === "medico" ? (
                    <span className="truncate font-semibold">Medico Exemplo</span>
                  ) : (
                    <span className="truncate font-semibold">Paciente Exemplo</span>
                  )}
                  {user.role === "medico" ? (
                    <span className="truncate text-xs">medico@example.com</span>
                  ) : (
                    <span className="truncate text-xs">paciente@example.com</span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { logout(); router.push("/login"); }}>
              <LogOut />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}