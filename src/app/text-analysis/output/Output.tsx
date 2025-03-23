"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function TextAnalysisOutputComponent() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isFading, setIsFading] = useState<boolean>(false);
    const router = useRouter();
    const [level, setLevel] = useState("C2");

    return (
        <div className="p-8 min-w-[1200px] bg-[#f5f5f5] rounded-xl shadow-lg flex flex-col space-y-6 mt-10 mb-10">

            {/* Left Section: Text & Dropdown */}
            <div className="flex space-x-6">
                <div className="w-1/2 bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <div
                        className="p-3 bg-gray-500 text-white rounded-md mr-auto mb-8"
                    >
                        Seviye: {level}
                    </div>

                    <div className="flex flex-col space-y-2 w-[200px] ml-auto">
                        <label htmlFor="level" className="text-sm font-semibold text-[#1e1e1e] text-right">Renklendirme</label>
                        <select
                            id="coloring"
                            name="coloring"
                            // value={formData.level}
                            // onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-sm text-[#1e1e1e] focus:outline-gray-500"
                        >
                            <option value="word">Kelimeye göre</option>
                            <option value="sentence">Cümleye göre</option>
                        </select>
                    </div>

                    <p className="mt-4 text-gray-700 text-sm text-justify">
                        Sermet Bey, gözünü köşkten alamıyordu. Her tarafında geniş balkonları vardı. Temellerinin üzerine yaslanmış sanılacaktı. Kuluçka yatan beyaz bir Nemse tavuğu gibi yayvandı. Yirmi senedir, çocuğa kavuşalıdan beri hep böyle bir yuva tahayyül ederlerdi. Asabî bir istical ile,
                        - Niye oturamayız? diye sordu.
                        - Efendim, bu köşkte peri vardır.
                        - Ne perisi?
                        - Bayağı peri! Gece çıkar. Evdekilere rahat vermez.
                    </p>
                </div>

                {/* Right Section: Tables */}
                <div className="flex max-h-[50vh] w-1/2 space-x-6 mt-20">
                    {/* Word Table */}
                    <div className="flex-1">
                        <h3 className="font-semibold mb-2">Kelime</h3>
                        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                            <div className="max-h-[40vh] overflow-y-scroll">
                                {[
                                    { word: "göz", level: "A2" },
                                    { word: "köşk", level: "B2" },
                                    { word: "taraf", level: "C2" },
                                    { word: "temel", level: "A1" },
                                    { word: "tavuk", level: "A1" },
                                    { word: "peri", level: "A1" },
                                    { word: "peri", level: "A1" },
                                    { word: "peri", level: "A1" },
                                    { word: "peri", level: "A1" },
                                    { word: "peri", level: "A1" },
                                    { word: "peri", level: "A1" },
                                    { word: "peri", level: "A1" },
                                    { word: "peri", level: "A1" },
                                    { word: "peri", level: "A1" },
                                    { word: "peri", level: "A1" },
                                    { word: "peri", level: "A1" },
                                    { word: "peri", level: "A1" },
                                ].map((item, index) => (
                                    <div key={index} className="flex justify-between py-1 mr-4">
                                        <span>{item.word}</span>
                                        <span className="text-gray-500">{item.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Grammar Table */}
                    <div className="flex-1">
                        <h3 className="font-semibold mb-2">Gramer Yapısı</h3>
                        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                            <div className="max-h-[40vh] overflow-y-scroll">
                                {[
                                    { rule: "duyulan geçmiş zaman", level: "B2" },
                                    { rule: "görülen geçmiş zaman", level: "C2" },
                                    { rule: "sıfat fiil", level: "C2" },
                                    { rule: "olumsuzluk eki", level: "A2" },
                                    { rule: "gelecek zaman", level: "B1" },
                                    { rule: "gelecek zaman", level: "B1" },
                                    { rule: "gelecek zaman", level: "B1" },
                                    { rule: "gelecek zaman", level: "B1" },
                                    { rule: "gelecek zaman", level: "B1" },
                                    { rule: "gelecek zaman", level: "B1" },
                                    { rule: "gelecek zaman", level: "B1" },
                                    { rule: "gelecek zaman", level: "B1" },
                                    { rule: "gelecek zaman", level: "B1" },
                                    { rule: "gelecek zaman", level: "B1" },
                                    { rule: "gelecek zaman", level: "B1" },
                                    { rule: "gelecek zaman", level: "B1" },
                                    { rule: "ayrılma hal eki", level: "B1" },
                                ].map((item, index) => (
                                    <div key={index} className="flex justify-between py-1 mr-4">
                                        <span>{item.rule}</span>
                                        <span className="text-gray-500">{item.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row">
                <button
                    className="p-3 bg-gray-500 text-white rounded-md transition-all duration-300
                   hover:scale-105 hover:bg-gray-600 active:scale-95 cursor-pointer ml-auto"
                    onClick={() => router.push("/text-analysis")}
                >
                    Tekrar Analiz Et
                </button>
            </div>
        </div>
    );
};
