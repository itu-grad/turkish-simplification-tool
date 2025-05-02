"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ClipboardCopy } from "lucide-react";
import SubmitButton from "@/components/form/SubmitButton";
import { useLevelAdaptationFormStore } from "@/stores/levelAdaptationStore";

export default function LevelAdaptationOutputComponent() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isFading, setIsFading] = useState<boolean>(false);
    const [copied, setCopied] = useState(false);
    const [hasHydrated, setHasHydrated] = useState(false);
    const { alternatives, formData, resetFormData } = useLevelAdaptationFormStore();
    const router = useRouter();

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    useEffect(() => {
        if (hasHydrated && (!alternatives || alternatives.length === 0)) {
            router.replace("/level-adaptation");
        }
    }, [hasHydrated, formData, alternatives, router]);

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
        <div className="p-8 min-w-[1200px] bg-primary-bg rounded-xl shadow-lg flex flex-col space-y-6 mt-10 mb-10">
            <div className="flex flex-row gap-3">
                <div
                    className="mt-6 p-3 bg-button-bg text-secondary-bg rounded-md ml-auto"
                >
                    Seviye: {formData.level.charAt(0).toUpperCase() + formData.level.slice(1)}
                </div>
            </div>
            <div className="flex flex-col gap-3 w-full items-stretch">
                <div className="flex flex-row gap-6">
                    <div className="flex-1">
                        <div className="text-2xl font-medium text-header mb-5">Orijinal Metin</div>
                        <div className="p-6 bg-white rounded-md shadow-sm flex-1 min-h-[250px]">
                            <p className="text-header text-justify flex-1">
                                {formData?.content}
                            </p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-2xl font-medium text-header mb-5">Uyarlanan Metin</div>
                        <div className="flex flex-col p-6 bg-white rounded-md shadow-sm flex-1 min-h-[250px]">
                            <div className="flex flex-row mb-4">
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded-md transition ml-auto"
                                >
                                    <ClipboardCopy size={16} color="black" />
                                    {copied ? <p className="text-black">Kopyalandı!</p> : ""}
                                </button>
                            </div>
                            <div className="flex flex-row">
                                <div>
                                    <div className="max-w-[20] pt-16 pr-4">
                                        <FaArrowLeft
                                            className="text-arrow-txt text-2xl cursor-pointer hover:text-blue-500"
                                            onClick={handlePrevious}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className={`transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}>
                                        <p className="text-header text-justify flex-1">{alternatives.length ? alternatives[currentIndex].text : ""}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="max-w-[20] pt-16 pl-4">
                                        <FaArrowRight
                                            className="text-arrow-txt text-2xl cursor-pointer hover:text-blue-500"
                                            onClick={handleNext}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="mr-auto">
                    <span className="text-subheader text-sm">Kaynak olarak <em>Yeni İstanbul</em> kullanılmıştır.</span>
                </div>
                <div className="ml-auto">
                    <SubmitButton
                        isLoading={false}
                        text="Tekrar Uyarla"
                        type="button"
                        onClick={() => {
                            resetFormData();
                            window.location.href = "/level-adaptation#content";
                        }}
                    />
                </div>
            </div>
        </div>
    );
}