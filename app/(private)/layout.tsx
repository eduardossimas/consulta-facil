import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "../globals.css";

export default function PrivateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <main className="flex-1 overflow-auto w-full">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}