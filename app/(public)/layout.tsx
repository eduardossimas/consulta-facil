import "../globals.css";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-teal-100 text-teal-950" suppressHydrationWarning>
        <div className="antialiased">{children}</div>
      </body>
    </html>
  );
}