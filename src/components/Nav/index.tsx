"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
// import { ThemeToggle } from "@/components";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, t, setLocale, localizeHref } = useLocale();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { href: localizeHref("/"), label: t("nav.home") },
    { href: localizeHref("/about"), label: t("nav.about") },
    { href: localizeHref("/projects"), label: t("nav.projects") },
    { href: localizeHref("/notes"), label: t("nav.notes") },
  ];

  return (
    <nav className="py-8 relative">
      <div className="max-w-7xl mx-auto">
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
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 px-2 py-2 transition-colors"
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
              className="text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
              aria-label="Toggle menu"
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
          className={`fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <button
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              onClick={closeMenu}
              aria-label="Close menu"
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
                  className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 py-2 transition-colors"
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
