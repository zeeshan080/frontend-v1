// (app)/layout.tsx
import Header from "@/components/shared/header";
import { Toaster } from "sonner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster />
    </>
  );
}
