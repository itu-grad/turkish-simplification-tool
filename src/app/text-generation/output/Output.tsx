"use client";

import TableWithLevels from "@/components/TableWithLevels";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ClipboardCopy } from "lucide-react";

export default function TextGenerationOutputComponent() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isFading, setIsFading] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    const alternatives = [
        {
            text: "Sehrin en önemli yerlerinden birisi de çöplükleridir. Çöplükler şehirler için gereklidir evet ama bu kadar önemli olduklarını hiç düşündünüz mü?",
            words: [
                { text: "göz", level: "A2" },
                { text: "köşk", level: "B2" },
                { text: "taraf", level: "C2" },
                { text: "temel", level: "A1" },
                { text: "tavuk", level: "A1" },
                { text: "peri", level: "A1" },
            ],
            grammar: [
                { text: "duyulan geçmiş zaman", level: "B2" },
                { text: "görülen geçmiş zaman", level: "C2" },
                { text: "sıfat fiil", level: "C2" },
                { text: "olumsuzluk eki", level: "A2" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
            ]
        },
        {
            text: "İstanbul güzel şehir. İstanbul’un boy boy, renk renk resimleri yapılmıştır yıllar boyu.",
            words: [
                { text: "göz", level: "A2" },
                { text: "köşk", level: "B2" },
                { text: "taraf", level: "C2" },
                { text: "temel", level: "A1" },
                { text: "tavuk", level: "A1" },
                { text: "peri", level: "A1" },
            ],
            grammar: [
                { text: "duyulan geçmiş zaman", level: "B2" },
                { text: "görülen geçmiş zaman", level: "C2" },
                { text: "sıfat fiil", level: "C2" },
                { text: "olumsuzluk eki", level: "A2" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
            ]
        },
        {
            text: "Bir çöplük, bence bir şehir demektir. Martıların hayat kavgaları en çok çöplüklerde olur.",
            words: [
                { text: "göz", level: "A2" },
                { text: "köşk", level: "B2" },
                { text: "taraf", level: "C2" },
                { text: "temel", level: "A1" },
                { text: "tavuk", level: "A1" },
                { text: "peri", level: "A1" },
            ],
            grammar: [
                { text: "duyulan geçmiş zaman", level: "B2" },
                { text: "görülen geçmiş zaman", level: "C2" },
                { text: "sıfat fiil", level: "C2" },
                { text: "olumsuzluk eki", level: "A2" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
            ]
        },
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(alternatives[currentIndex].text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleNext = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % alternatives.length);
            setIsFading(false);
        }, 300);
    };

    const handlePrevious = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? alternatives.length - 1 : prevIndex - 1
            );
            setIsFading(false);
        }, 300);
    };

    return (
        <div className="p-8 min-w-[1200px] bg-[#f5f5f5] rounded-xl shadow-lg flex flex-col space-y-6 mt-10 mb-10">
            <div className="text-2xl font-medium text-[#1e1e1e] mb-5">Üretilen Metin</div>

            <div className="flex flex-row gap-3">
                <div className="max-w-[20] flex justify-center items-center">
                    <FaArrowLeft
                        className="text-gray-600 text-2xl cursor-pointer hover:text-blue-500"
                        onClick={handlePrevious}
                    />
                </div>
                <div className={`w-full transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}>
                    <div className="flex flex-row mb-4">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-md transition ml-auto"
                        >
                            <ClipboardCopy size={16} />
                            {copied ? "Kopyalandı!" : ""}
                        </button>
                    </div>
                    <div className="p-6 bg-white rounded-md shadow-sm">
                        <p className="text-[#1e1e1e] text-justify">
                            {alternatives[currentIndex].text}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-10">
                        {/* <div className="flex flex-col p-6 bg-white rounded-md shadow-sm">
                            <p className="text-xl font-medium text-[#1e1e1e]">Kullanılan Kelimeler</p>
                            <div className="overflow-y-scroll mt-4 max-h-32">
                                {alternatives[currentIndex].words.map((word, index) => (
                                    <div key={index} className="text-[#1e1e1e]">
                                        {word}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col p-6 bg-white rounded-md shadow-sm">
                            <p className="text-xl font-medium text-[#1e1e1e]">Kullanılan Gramer Yapıları</p>
                            <div className="overflow-y-scroll mt-4 max-h-32">
                                <ul className="text-[#1e1e1e] text-left list-disc list-inside">
                                    {alternatives[currentIndex].grammar.map((grammar, index) => (
                                        <li key={index}>{grammar}</li>
                                    ))}
                                </ul>
                            </div>
                        </div> */}
                        <TableWithLevels title={"Kullanılan Kelimeler"} levelList={alternatives[currentIndex].words} width={0} />
                        <TableWithLevels title={"Kullanılan Gramer Yapıları"} levelList={alternatives[currentIndex].grammar} width={0} />
                    </div>
                    <div className="text-2xl font-medium text-[#1e1e1e] mt-5">{currentIndex + 1}</div>
                </div>
                <div className="max-w-[20] flex justify-center items-center">
                    <FaArrowRight
                        className="text-gray-600 text-2xl cursor-pointer hover:text-blue-500"
                        onClick={handleNext}
                    />
                </div>
            </div>
            <div className="flex flex-row">
                <button
                    className="mt-3 p-3 bg-gray-500 text-white rounded-md transition-all duration-300
                   hover:scale-105 hover:bg-gray-600 active:scale-95 cursor-pointer ml-auto"
                    onClick={() => router.push("/text-generation")}
                >
                    Tekrar Üret
                </button>
            </div>
        </div>
    );
}