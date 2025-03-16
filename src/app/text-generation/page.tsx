"use client";
import React, { useState } from "react";
import TextGenerationInput from "./Input";
import TextGenerationOutput from "./Output";

export default function TextGeneration() {
    const [isLoading, setIsLoading] = useState(false);
    const [showOutput, setShowOutput] = useState(false);

    const handleGenerateText = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setShowOutput(true);
        }, 2000);
    };

    return (
        <div>
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-50 bg-[#f5f5f5]">
                <h1 className="text-3xl text-[#1e1e1e]">Metin Üretimi</h1>
                <p className="text-lg text-gray-600 text-justify mt-25">
                    Metin üretimi, öğretmenlere özel olarak tasarlanmış güçlü bir araçtır.
                    Belirlediğiniz seviye, kelime sayısı, tema, hedef kelimeler ve gramer yapıları doğrultusunda özgün ve seviyeye uygun metinler oluşturur.
                    Alternatif metinler sunarak en uygun içeriği seçmenize yardımcı olur.
                    Ayrıca, üretilen metinlerde kullanılan kelime ve dilbilgisi yapılarını detaylı şekilde listeleyerek öğretim süreçlerini daha verimli hale getirir.
                </p>
            </section>
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-50 bg-white">
                {!showOutput ? (<TextGenerationInput isLoading={isLoading} handleGenerateText={handleGenerateText} />) : (<TextGenerationOutput />)}
            </section>
        </div>
    );
}
