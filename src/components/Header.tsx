import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center h-16 px-10">
                {/* Left: Logo */}
                <div className="flex items-center">
                    <Link href="/">
                        <img src="/logo.png" alt="Logo" className="h-10" />
                    </Link>
                </div>

                {/* Right: Navigation Links (Centered) */}
                <nav>
                    <ul className="flex space-x-30">
                        <li>
                            <Link href="text-generation" className="text-gray-700 hover:text-gray-900">
                                Metin Üretimi
                            </Link>
                        </li>
                        <li>
                            <Link href="#analysis" className="text-gray-700 hover:text-gray-900">
                                Metin Analizi
                            </Link>
                        </li>
                        <li>
                            <Link href="#adaptation" className="text-gray-700 hover:text-gray-900">
                                Seviye Uyarlama
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
