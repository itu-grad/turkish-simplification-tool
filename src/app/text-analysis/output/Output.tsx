"use client";

import SubmitButton from "@/components/SubmitButton";
import TableWithLevels from "@/components/TableWithLevels";
import { useTextAnalysisFormStore } from "@/stores/textAnalysisStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TextAnalysisOutputComponent() {
    const [hasHydrated, setHasHydrated] = useState(false);
    const { response, formData, resetFormData } = useTextAnalysisFormStore();
    const router = useRouter();
    const words = [
        { text: "göz", level: "A2" },
        { text: "köşk", level: "B2" },
        { text: "taraf", level: "C2" },
        { text: "temel", level: "A1" },
        { text: "tavuk", level: "A1" },
        { text: "peri", level: "A1" },
        { text: "peri", level: "A1" },
        { text: "peri", level: "A1" },
        { text: "peri", level: "A1" },
        { text: "peri", level: "A1" },
        { text: "peri", level: "A1" },
        { text: "peri", level: "A1" },
        { text: "peri", level: "A1" },
        { text: "peri", level: "A1" },
        { text: "peri", level: "A1" },
        { text: "peri", level: "A1" },
        { text: "peri", level: "A1" },
    ];
    const rules = [
        { text: "duyulan geçmiş zaman", level: "B2" },
        { text: "görülen geçmiş zaman", level: "C2" },
        { text: "sıfat fiil", level: "C2" },
        { text: "olumsuzluk eki", level: "A2" },
        { text: "gelecek zaman", level: "B1" },
        { text: "gelecek zaman", level: "B1" },
        { text: "gelecek zaman", level: "B1" },
        { text: "gelecek zaman", level: "B1" },
        { text: "gelecek zaman", level: "B1" },
        { text: "gelecek zaman", level: "B1" },
        { text: "gelecek zaman", level: "B1" },
        { text: "gelecek zaman", level: "B1" },
        { text: "gelecek zaman", level: "B1" },
        { text: "gelecek zaman", level: "B1" },
        { text: "gelecek zaman", level: "B1" },
        { text: "gelecek zaman", level: "B1" },
        { text: "ayrılma hal eki", level: "B1" }
    ];

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    useEffect(() => {
        if (hasHydrated && (!response || response.sentenceLevels.length === 0)) {
            router.replace("/text-analysis");
        }
    }, [hasHydrated, formData, response]);

    return (
        <div className="p-8 min-w-[1200px] bg-primary-bg rounded-xl shadow-lg flex flex-col space-y-6 mt-10 mb-10">

            <div className="flex space-x-6">
                <div className="w-1/2 bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <div
                        className="p-3 bg-button-bg text-secondary-bg rounded-md mr-auto mb-8"
                    >
                        Seviye: {response.contentLevel}
                    </div>

                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row items-center justify-center gap-1 place-self-center rounded-lg border-1 border-gray-400 px-3 py-1 text-sm font-semibold xs:flex-row xs:gap-3">
                            <div className="flex flex-row gap-3 text-center">
                                <span className="text-[#9ba7af]">A1</span>
                                <span className="text-[#077015]">A2</span>
                                <span className="text-[#0072e4]">B1</span>
                                <span className="text-[#0b0882]">B2</span>
                                <span className="text-[#d0cb00]">C1</span>
                                <span className="text-[#de682c]">C2</span>
                            </div>
                        </div>
                        <select
                            id="coloring"
                            name="coloring"
                            className="p-2 border border-input-border rounded-md bg-secondary-bg text-sm text-header focus:outline-gray-500"
                        >
                            <option value="" hidden>Renklendirme</option>
                            <option value="word">Kelimeye göre</option>
                            <option value="sentence">Cümleye göre</option>
                            <option value="no-coloring">Renklendirme yok</option>
                        </select>
                    </div>

                    <p className="mt-4 text-paragraph text-sm text-justify">
                        {formData.content}
                    </p>
                </div >

                <div className="flex max-h-[50vh] w-1/2 space-x-6 mt-20">
                    <TableWithLevels title={"Kelimeler"} levelList={words} width={0} />
                    <TableWithLevels title={"Gramer Yapıları"} levelList={rules} width={0} />
                </div>
            </div >

            <div className="flex flex-row ml-auto">
                <SubmitButton
                    isLoading={false}
                    text="Tekrar Analiz Et"
                    type="button"
                    onClick={() => {
                        resetFormData();
                        window.location.href = "/text-analysis#content";
                    }}
                />
            </div>
        </div >
    );
};
