import React from "react";
import Header from "@/components/main/Header";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <div className="flex min-h-screen flex-col bg-canvas text-ink">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </SmoothScrollProvider>
  );
}
