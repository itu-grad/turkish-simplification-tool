import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-footer-bg text-white py-6 text-center">
            <div className="flex flex-col items-center gap-3">
                <p className="text-lg">Türkçe Metin Sadeleştirme Aracı</p>
                <div className="flex gap-6">
                    <a href="https://nlp.itu.edu.tr" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/webpage.svg"
                            alt="Webpage"
                            width={24}
                            height={24}
                            style={{ filter: "invert(80%) sepia(10%) saturate(200%) hue-rotate(180deg)" }}
                            className="text-white opacity-80 hover:scale-110 transition"
                        />
                    </a>
                    <a href="https://www.linkedin.com/company/itunlp" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/linkedin.svg"
                            alt="LinkedIn"
                            width={24}
                            height={24}
                            style={{
                                filter:
                                    "invert(26%) sepia(91%) saturate(1107%) hue-rotate(186deg) brightness(92%) contrast(88%)",
                            }}
                            className="hover:scale-110 transition"
                        />
                    </a>
                    <a href="/resources">
                        <Image
                            src="/question_mark.svg"
                            alt="Resources"
                            width={24}
                            height={24}
                            className="hover:scale-110 transition opacity-80"
                            style={{ filter: "invert(80%) sepia(10%) saturate(200%) hue-rotate(180deg)" }}
                        />
                    </a>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                    İTÜ Doğal Dil İşleme Grubu
                </p>
            </div>
        </footer>
    );
}