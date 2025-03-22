"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function LevelAdaptationOutputComponent() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isFading, setIsFading] = useState<boolean>(false);
    const router = useRouter();
    const formData = {
        level: "B1",
        content: "Sermet Bey, gözünü köşkten alamıyordu. Her tarafında geniş balkonları vardı. Temellerinin üzerine yaslanmış sanılacaktı. Kuluçka yatan beyaz bir Nemse tavuğu gibi yayvandı. Yirmi senedir, çocuğa kavuşalıdan beri hep böyle bir yuva tahayyül ederlerdi."
    }
    const alternatives = [
        {
            text: "Sehrin en önemli yerlerinden birisi de çöplükleridir. Çöplükler şehirler için gereklidir evet ama bu kadar önemli olduklarını hiç düşündünüz mü?",
        },
        {
            text: "İstanbul güzel şehir. İstanbul’un boy boy, renk renk resimleri yapılmıştır yıllar boyu.",
        },
        {
            text: "Bir çöplük, bence bir şehir demektir. Martıların hayat kavgaları en çok çöplüklerde olur.",
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
                <div
                    className="mt-6 p-3 bg-gray-500 text-white rounded-md transition-all duration-300
                   hover:scale-105 hover:bg-gray-600 active:scale-95 ml-auto"
                >
                    Seviye: {formData?.level}
                </div>
            </div>
            <div className="flex flex-row gap-3 w-full items-stretch">
                <div className="p-6 bg-white rounded-md shadow-sm flex-1 min-h-[250px]">
                    <div className="text-2xl font-medium text-[#1e1e1e] mb-5">Orijinal Metin</div>
                    <p className="text-[#1e1e1e] text-justify flex-1">
                        {formData?.content}
                    </p>
                </div>

                <div className="flex flex-row gap-3 flex-1 justify-center items-center min-h-[250px]">
                    <div className="max-w-[20] flex justify-center items-center">
                        <FaArrowLeft
                            className="text-gray-600 text-2xl cursor-pointer hover:text-blue-500"
                            onClick={handlePrevious}
                        />
                    </div>
                    <div className={`flex flex-col h-full w-full transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}>
                        <div className={`p-6 bg-white rounded-md shadow-sm w-full h-full transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}>
                            <div className="text-2xl font-medium text-[#1e1e1e] mb-5">Üretilen Metin</div>
                            <p className="text-[#1e1e1e] text-justify flex-1">{alternatives[currentIndex].text}</p>
                        </div>
                        {/* <div className="text-2xl font-medium text-[#1e1e1e] mt-5">{currentIndex + 1}</div> */}
                    </div>
                    <div className="max-w-[20] flex justify-center items-center">
                        <FaArrowRight
                            className="text-gray-600 text-2xl cursor-pointer hover:text-blue-500"
                            onClick={handleNext}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <button
                    className="mt-6 p-3 bg-gray-500 text-white rounded-md transition-all duration-300
                   hover:scale-105 hover:bg-gray-600 active:scale-95 cursor-pointer ml-auto"
                    onClick={() => router.push("/level-adaptation")}
                >
                    Tekrar Analiz Et
                </button>
            </div>
        </div>
    );
}