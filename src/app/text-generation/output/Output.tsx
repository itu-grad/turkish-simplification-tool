"use client";

import TableWithLevels from "@/components/TableWithLevels";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ClipboardCopy } from "lucide-react";
import { useTextGenerationFormStore } from "@/stores/textGenerationStore";

const isFormDataEmpty = (data: any) => {
    return (
        !data?.wordCount &&
        !data?.theme &&
        !data?.content &&
        (!data?.targetWords || data.targetWords.length === 0) &&
        (!data?.targetGrammar || data.targetGrammar.length === 0)
    );
};

export default function TextGenerationOutputComponent() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isFading, setIsFading] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);
    const [hasHydrated, setHasHydrated] = useState(false);

    const router = useRouter();
    const { alternatives, formData, resetFormData } = useTextGenerationFormStore();

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    useEffect(() => {
        if (hasHydrated && (isFormDataEmpty(formData) || !alternatives || alternatives.length === 0)) {
            router.replace("/text-generation");
        }
    }, [hasHydrated, formData, alternatives]);

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

    if (!hasHydrated || !alternatives || !alternatives[currentIndex]) {
        return (
            <div className="flex justify-center items-center min-h-[300px] w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
            </div>
        );
    }

    return (
        <div className="p-8 min-w-[1200px] bg-[#f5f5f5] rounded-xl shadow-lg flex flex-col space-y-6 mt-10 mb-10">
            <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="col-span-1"></div>
                <div className="col-span-1 flex justify-center items-center text-2xl font-medium text-[#1e1e1e]">
                    Üretilen Metin
                </div>
                <div
                    className="p-3 bg-gray-500 text-white rounded-md ml-auto"
                >
                    Seviye: {formData.level.charAt(0).toUpperCase() + formData.level.slice(1)}
                </div>
            </div>
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
                            <ClipboardCopy size={16} color="black" />
                            {copied ? <p className="text-black">Kopyalandı!</p> : ""}
                        </button>
                    </div>
                    <div className="p-6 bg-white rounded-md shadow-sm">
                        <p className="text-[#1e1e1e] text-justify">
                            {alternatives[currentIndex].text}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-10">
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
                    onClick={() => { router.push("/text-generation"); resetFormData() }}
                >
                    Tekrar Üret
                </button>
            </div>
        </div>
    );
}
