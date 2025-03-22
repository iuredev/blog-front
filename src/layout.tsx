import { ReactNode } from "react";
import { Nav, Footer } from "./components";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid-template-rows min-h-screen grid grid-rows-[auto,1fr,auto] mx-auto max-w-[47.5rem] text-[1.1rem] leading-[34px] tracking-[0.9px] text-gray-800 dark:text-gray-300 ">
      <header className="md:px-0 px-6">
        <Nav />
      </header>
      <main className="flex-grow container mb-5 md:px-0 px-6 pt-14 pb-4">{children}</main>

      <footer className="p-6 md:p-0 md:py-2">
        <Footer />
      </footer>
    </div>
  );
}
