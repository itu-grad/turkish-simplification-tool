"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        { href: "/text-generation", label: "Metin Üretimi" },
        { href: "/text-analysis", label: "Metin Analizi" },
        { href: "/level-adaptation", label: "Seviye Uyarlama" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center h-16 px-10">

                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={160}
                            height={160}
                            className="h-10 w-auto"
                        />
                    </Link>
                </div>
                <nav>
                    <ul className="flex space-x-30">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`relative text-paragraph hover:text-header transition-colors duration-300 
                                            after:content-[''] after:absolute after:left-0 after:-bottom-1 
                                            after:h-[2px] after:transition-all after:duration-300 
                                            ${isActive ? 'after:w-full after:bg-gray-900' : 'after:w-0 hover:after:w-full after:bg-gray-900'}`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
