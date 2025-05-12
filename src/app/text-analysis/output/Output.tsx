"use client";

import { handleDownloadExcel } from "@/app/lib/export/handleDownloadExcel";
import SubmitButton from "@/components/form/SubmitButton";
import TableWithLevels from "@/components/table/TableWithLevels";
import { useTextAnalysisFormStore } from "@/stores/textAnalysisStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillFileExcel } from "react-icons/ai";

export default function TextAnalysisOutputComponent() {
    const [hasHydrated, setHasHydrated] = useState(false);
    const { response, formData, resetFormData } = useTextAnalysisFormStore();
    const [matchedWords, setMatchedWords] = useState<Record<string, string>>({});
    const [matchedSentences, setMatchedSentences] = useState<string[]>([]);
    const [matchedGrammars, setGrammars] = useState<Record<string, string>>({});
    const [coloringMode, setColoringMode] = useState<string>("");
    const [excelLoading, setExcelLoading] = useState<boolean>(false);
    const [selectedSource, setSelectedSource] = useState<"yeni-istanbul" | "yeni-hitit">("yeni-istanbul");

    const router = useRouter();

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    useEffect(() => {
        if (hasHydrated && (!response || response.sentenceLevels.length === 0)) {
            router.replace("/text-analysis");
        }
    }, [hasHydrated, formData, response, router]);

    useEffect(() => {
        if (formData.content.length === 0) return;

        setMatchedSentences(response.sentenceLevels);
        // setGrammars(Object.fromEntries(
        //     response.grammarLevels.map(({ text, level }) => [text, level])
        // ));

        fetch("/api/word-topic-levels", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: formData.content,
                wordLevelSource: selectedSource,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMatchedWords(data[0]);
                setGrammars(data[1]);
            })
            .catch((error) => {
                console.error("Error fetching word levels:", error);
            });

    }, [formData.content, response.sentenceLevels, selectedSource]);

    useEffect(() => {
        console.log("Selected source changed to:", selectedSource);
    }, [selectedSource]);

    return (
        <div className="p-8 min-w-[1200px] bg-primary-bg rounded-xl shadow-lg flex flex-col space-y-6 mt-10 mb-10">
            <div className="w-full flex justify-end mb-4">
                <div className="flex items-center gap-2">
                    <div className="relative flex bg-toggle-bg rounded-full p-1">
                        {["yeni-istanbul", "yeni-hitit"].map((option) => (
                            <button
                                key={option}
                                onClick={() =>
                                    setSelectedSource(option as "yeni-istanbul" | "yeni-hitit")
                                }
                                className={`px-4 py-1 rounded-full text-sm transition-colors duration-200 ${selectedSource === option
                                    ? "bg-button-hover-bg text-white"
                                    : "text-header"
                                    }`}
                            >
                                {option === "yeni-istanbul" ? "Yeni İstanbul" : "Yeni Hitit"}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


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
                        {formData.content
                            .match(/[^.!?]+[.!?]?/g)
                            ?.map((sentence, idx) => {
                                const sentenceLevel = matchedSentences?.[idx]?.toLowerCase();
                                const sentenceClass =
                                    coloringMode === "sentence" && sentenceLevel
                                        ? `text-level-${sentenceLevel}`
                                        : "";
                                if (coloringMode === "word") {
                                    return (
                                        <span key={idx}>
                                            {sentence.split(/(\s+)/).map((token, i) => {
                                                const word = token.toLowerCase().replace(/[^\wçğıöşü]/g, "");
                                                const level = matchedWords[word];
                                                const className = level ? `text-level-${level.toLowerCase()}` : "";
                                                return (
                                                    <span key={i} className={className}>
                                                        {token}
                                                    </span>
                                                );
                                            })}
                                        </span>
                                    );
                                }
                                return (
                                    <span key={idx} className={sentenceClass}>
                                        {sentence}
                                    </span>
                                );
                            })}
                    </p>
                </div >

                <div className="flex max-h-[50vh] w-1/2 space-x-6 mt-20">
                    <TableWithLevels title={"Kelimeler"} levelList={matchedWords} />
                    <TableWithLevels title={"Gramer Yapıları"} levelList={matchedGrammars} />
                </div>
            </div >

            <div className="flex flex-row">
                <div className="mr-auto">
                    <span className="text-subheader text-sm">
                        Kaynak olarak <em>{selectedSource === "yeni-istanbul" ? "Yeni İstanbul" : "Yeni Hitit"}</em> kullanılmıştır.
                    </span>
                </div>
                <div className="ml-auto flex gap-4">

                    <button
                        onClick={() =>
                            handleDownloadExcel(matchedWords, matchedGrammars, formData.content, setExcelLoading)
                        }
                        className="mt-6 p-3 w-52 flex items-center justify-center gap-2 bg-green-700 text-white rounded-md transition-all duration-300 hover:scale-105 hover:bg-green-600 active:scale-95 cursor-pointer disabled:opacity-50"
                        disabled={excelLoading}
                    >
                        {excelLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <AiFillFileExcel className="text-white text-lg" />
                                <span className="font-medium">Tablo Olarak İndir</span>
                            </>
                        )}
                    </button>
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

