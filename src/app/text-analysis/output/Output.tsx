"use client";

import SubmitButton from "@/components/SubmitButton";
import TableWithLevels from "@/components/TableWithLevels";
import { useTextAnalysisFormStore } from "@/stores/textAnalysisStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TextAnalysisOutputComponent() {
    const [hasHydrated, setHasHydrated] = useState(false);
    const { response, formData, resetFormData } = useTextAnalysisFormStore();
    const [matchedWords, setMatchedWords] = useState<Record<string, string>>({});
    const [coloringMode, setColoringMode] = useState<string>("");
    const router = useRouter();
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
    const ruleRecord: Record<string, string> = Object.fromEntries(
        rules.map(({ text, level }) => [text, level])
    );

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    useEffect(() => {
        if (hasHydrated && (!response || response.sentenceLevels.length === 0)) {
            router.replace("/text-analysis");
        }
    }, [hasHydrated, formData, response]);

    useEffect(() => {
        if (formData.content.length === 0) return;

        fetch("/api/word-levels", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: formData.content }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMatchedWords(data);
            })
            .catch((error) => {
                console.error("Error fetching word levels:", error);
            });

    }, [formData.content]);

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
                                <span className="text-level-a1">A1</span>
                                <span className="text-level-a2">A2</span>
                                <span className="text-level-b1">B1</span>
                                <span className="text-level-b2">B2</span>
                                <span className="text-level-c1">C1</span>
                                <span className="text-level-c2">C2</span>
                            </div>
                        </div>
                        <select
                            id="coloring"
                            name="coloring"
                            value={coloringMode}
                            onChange={(e) => setColoringMode(e.target.value)}
                            className="p-2 border border-input-border rounded-md bg-secondary-bg text-sm text-header focus:outline-gray-500"
                        >
                            <option value="" hidden>Renklendirme</option>
                            <option value="word">Kelimeye göre</option>
                            <option value="sentence">Cümleye göre</option>
                            <option value="no-coloring">Renklendirme yok</option>
                        </select>
                    </div>

                    <p className="mt-4 text-paragraph text-sm text-justify">
                        {formData.content.split(/(\s+)/).map((token, i) => {
                            const word = token.toLowerCase().replace(/[^\wçğıöşü]/g, '');
                            const level = matchedWords[word];
                            const shouldColor = coloringMode === "word" && level;

                            const className = shouldColor ? `text-level-${level.toLowerCase()}` : "";

                            return (
                                <span key={i} className={className}>
                                    {token}
                                </span>
                            );
                        })}
                    </p>
                </div >

                <div className="flex max-h-[50vh] w-1/2 space-x-6 mt-20">
                    <TableWithLevels title={"Kelimeler"} levelList={matchedWords} width={0} />
                    <TableWithLevels title={"Gramer Yapıları"} levelList={ruleRecord} width={0} />
                </div>
            </div >

            <div className="flex flex-row">
                <div className="mr-auto">
                    <span className="text-subheader text-sm">Kaynak olarak <em>Yeni İstanbul</em> kullanılmıştır.</span>
                </div>
                <div className="ml-auto">
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
            </div>
        </div >
    );
};

