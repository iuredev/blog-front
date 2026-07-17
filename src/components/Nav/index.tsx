"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/hooks/useLocale";
// import { ThemeToggle } from "@/components";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, t, setLocale, localizeHref } = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { href: localizeHref("/"), label: t("nav.home") },
    { href: localizeHref("/projects"), label: t("nav.projects") },
    { href: localizeHref("/about"), label: t("nav.about") },
    { href: localizeHref("/notes"), label: t("nav.notes") },
  ];

  const isCurrent = (href: string) => {
    const path = href.split("?")[0];
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <nav className="relative py-5 sm:py-7 md:py-8">
      <div className="relative w-full min-w-0 md:left-1/2 md:w-[min(64rem,calc(100vw-2rem))] md:-translate-x-1/2">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link
              href={localizeHref("/")}
              className="font-family-system text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
            >
              IURE.DEV
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={`px-2 py-2 transition-colors ${isCurrent(item.href) ? "text-blue-500" : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-1 text-sm border-l border-gray-600 pl-3 ml-1">
              <button
                onClick={() => setLocale("en")}
                className={`px-1 py-1 transition-colors ${locale === "en" ? "font-bold text-gray-900 dark:text-gray-100" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
              >
                EN
              </button>
              <span className="text-gray-500">·</span>
              <button
                onClick={() => setLocale("pt-br")}
                className={`px-1 py-1 transition-colors ${locale === "pt-br" ? "font-bold text-gray-900 dark:text-gray-100" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
              >
                PT
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="grid min-h-11 min-w-11 place-items-center text-gray-900 transition-colors hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              aria-label={t("nav.openMenu")}
              aria-expanded={isOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`fixed right-0 top-0 h-dvh w-[min(18rem,calc(100vw-2rem))] overflow-y-auto bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <button
              className="absolute right-3 top-3 grid min-h-11 min-w-11 place-items-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={closeMenu}
              aria-label={t("nav.closeMenu")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="mt-8 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={`block py-2 transition-colors ${isCurrent(item.href) ? "text-blue-500" : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center space-x-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => { setLocale("en"); closeMenu(); }}
                  className={`text-sm px-1 py-1 transition-colors ${locale === "en" ? "font-bold text-gray-900 dark:text-gray-100" : "text-gray-500"}`}
                >
                  EN
                </button>
                <span className="text-gray-500">·</span>
                <button
                  onClick={() => { setLocale("pt-br"); closeMenu(); }}
                  className={`text-sm px-1 py-1 transition-colors ${locale === "pt-br" ? "font-bold text-gray-900 dark:text-gray-100" : "text-gray-500"}`}
                >
                  PT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
