import React from "react";
import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import TargetCursor from "@/components/ui/TargetCursor";

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
        <Footer />
        <TargetCursor color="#0a84ff" hideDefaultCursor={false} />
      </div>
    </SmoothScrollProvider>
  );
}
