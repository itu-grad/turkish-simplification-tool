"use client";
import React, { useState } from "react";
import TextAnalysisInput from "./Input";
import TextAnalysisOutput from "./Output";

export default function TextAnalysis() {
    const [isLoading, setIsLoading] = useState(false);
    const [showOutput, setShowOutput] = useState(false);

    const handleAnalyzeText = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setShowOutput(true);
        }, 2000);
    };

    return (
        <div>
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-50 bg-[#f5f5f5]">
                <h1 className="text-3xl text-[#1e1e1e]">Metin Analizi</h1>
                <p className="text-lg text-gray-600 text-justify mt-25">
                Metin analizi, mevcut bir metni detaylıca inceleyerek seviyesini belirleyemenize ve içeriği analiz edebilmenize olanak sağlar. 
                Kelime ve gramer yapılarının dökümü sayesinde metnin dil özelliklerini net bir şekilde görebilir, öğrencileriniz için en uygun materyali oluşturabilirsiniz. Böylece, dil seviyesine uygun kaynak seçimi ve geliştirme süreciniz daha bilinçli ve sistematik hale gelir.
                </p>
            </section>
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-50 bg-white">
                {!showOutput ? (<TextAnalysisInput isLoading={isLoading} handleAnalyzeText={handleAnalyzeText} />) : (<TextAnalysisOutput />)}
            </section>
        </div>
    );
}
