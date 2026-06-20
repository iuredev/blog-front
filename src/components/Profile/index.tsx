"use client";

import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useGetGlobal } from "@/api/hooks/global";
import { getStrapiMediaUrl } from "@/api/queries/global";
import { useLocale } from "@/hooks/useLocale";

const Profile = () => {
    const { data: global, isLoading } = useGetGlobal();
    const { t } = useLocale();

    const photoUrl = getStrapiMediaUrl(global?.photo?.url);
    const photoAlt = global?.photo?.alternativeText ?? "Iure Gomes";

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-4">
            <div className="gap-2 md:gap-8 max-w-4xl mx-auto text-center flex flex-col md:flex-row items-center md:items-start">
                <div className="w-36 h-36 sm:w-44 sm:h-44 shrink-0 profile-image">
                    {isLoading || !photoUrl ? (
                        <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    ) : (
                        <Image
                            width={176}
                            height={176}
                            src={photoUrl}
                            alt={photoAlt}
                            className="w-full h-full object-cover rounded-full"
                        />
                    )}
                </div>

                <div className="md:text-left">
                    <h1 className="text-3xl font-semibold md:text-2xl mt-4 md:mt-0 text-gray-800 dark:text-gray-300">
                        <Link
                            href="/about"
                            className="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        >
                            {t("profile.greeting")}
                        </Link>
                        <span className="text-gray-800 dark:text-gray-300">
                            {t("profile.bio")}
                        </span>
                    </h1>

                    <div className="flex justify-center md:justify-start space-x-6 mt-6 text-sm">
                        <a
                            href="https://instagram.com/iure.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="group flex items-center space-x-2"
                        >
                            <FaInstagram className="h-6 w-6 text-gray-300 group-hover:text-pink-500 transition duration-300" />
                            <span className="hidden md:inline text-gray-300 group-hover:text-pink-500 transition duration-300">
                                Instagram
                            </span>
                        </a>
                        <a
                            href="https://linkedin.com/in/iure-silva"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="group flex items-center space-x-2"
                        >
                            <FaLinkedin className="h-6 w-6 text-gray-300 group-hover:text-blue-500 transition duration-300" />
                            <span className="hidden md:inline text-gray-300 group-hover:text-blue-500 transition duration-300">
                                LinkedIn
                            </span>
                        </a>
                        <a
                            href="https://github.com/iuredev"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="group flex items-center space-x-2"
                        >
                            <FaGithub className="h-6 w-6 text-gray-300 group-hover:text-gray-500 transition duration-300" />
                            <span className="hidden md:inline text-gray-300 group-hover:text-gray-500 transition duration-300">
                                GitHub
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
