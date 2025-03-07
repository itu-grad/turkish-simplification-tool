import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
            <div className="flex items-center space-x-4">
                <Image src="/logo.png" alt="ITU NLP Logo" width={120} height={40} />
            </div>
            <nav className="space-x-6">
                <Link href="#" className="text-gray-700 hover:underline">Metin Üretimi</Link>
                <Link href="#" className="text-gray-700 hover:underline">Metin Analizi</Link>
                <Link href="#" className="text-gray-700 hover:underline">Seviye Uyarlama</Link>
            </nav>
        </header>
    );
}
