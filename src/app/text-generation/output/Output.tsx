"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function TextGenerationOutputComponent() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isFading, setIsFading] = useState<boolean>(false);
    const router = useRouter();

    const alternatives = [
        {
            text: "Sehrin en önemli yerlerinden birisi de çöplükleridir. Çöplükler şehirler için gereklidir evet ama bu kadar önemli olduklarını hiç düşündünüz mü?",
            words: ["Z - zürafa", "K - kendi", "G - gelişim", "Y - yolculuk"],
            grammar: ["Geçmiş zaman", "Sıfat fiil", "Olumsuzluk eki", "Gelecek zaman"],
        },
        {
            text: "İstanbul güzel şehir. İstanbul’un boy boy, renk renk resimleri yapılmıştır yıllar boyu.",
            words: ["A - ağaç", "B - balık", "C - cam", "D - deniz"],
            grammar: ["Şimdiki zaman", "Geniş zaman", "Emir kipi", "Dilek kipi"],
        },
        {
            text: "Bir çöplük, bence bir şehir demektir. Martıların hayat kavgaları en çok çöplüklerde olur.",
            words: ["E - elma", "F - fındık", "G - güneş", "H - hüzün"],
            grammar: ["Zarf fiil", "İsim fiil", "Gelecek zaman", "Olumsuzluk eki"],
        },
    ];

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
        <div className="p-8 min-w-[1200] bg-[#f5f5f5] rounded-xl shadow-lg flex flex-col space-y-6 mt-10 mb-10">
            <div className="flex flex-row gap-3">
                <div className="max-w-[20] flex justify-center items-center">
                    <FaArrowLeft
                        className="text-gray-600 text-2xl cursor-pointer hover:text-blue-500"
                        onClick={handlePrevious}
                    />
                </div>
                <div className={`w-full transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}>
                    <div className="text-2xl font-medium text-[#1e1e1e] mb-5">Üretilen Metin</div>
                    <div className="p-6 bg-white rounded-md shadow-sm">
                        <p className="text-[#1e1e1e] text-justify">
                            {alternatives[currentIndex].text}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-10">
                        <div className="flex flex-col p-6 bg-white rounded-md shadow-sm">
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
                        </div>
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
                    className="mt-6 p-3 bg-gray-500 text-white rounded-md transition-all duration-300
                   hover:scale-105 hover:bg-gray-600 active:scale-95 cursor-pointer ml-auto"
                    onClick={() => router.push("/text-generation")}
                >
                    Tekrar Üret
                </button>
            </div>
        </div>
    );
}