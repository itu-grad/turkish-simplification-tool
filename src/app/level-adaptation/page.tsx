"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LevelAdaptationInput from "./Input";

export default function LevelAdaptation() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleGenerateText = (formData: {level: string, content: string}) => {
        setIsLoading(true);

        console.log(formData);

        setTimeout(() => {
            setIsLoading(false);
            router.push("/level-adaptation/output#text-output");
        }, 2000);
    };

    return (
        <div>
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-50 bg-[#f5f5f5]">
                <h1 className="text-3xl text-[#1e1e1e]">Seviye Uyarlama</h1>
                <p className="text-lg text-gray-600 text-justify mt-25">
                    Seviye uyarlama, herhangi bir metni belirlediğiniz seviyeye uyarlayarak öğretmenlerin ders materyali oluşturma sürecini kolaylaştırır.
                    Orijinal metin ile uyarlanmış metni yan yana inceleyebilir, farklı seviyelere uygun alternatifler arasından seçim yapabilirsiniz.
                    Böylece, öğrencilerinizin seviyesine uygun, anlam bütünlüğünü koruyan ve etkili öğrenme sağlayan içerikler hazırlamanız mümkün hale gelir.
                </p>
            </section>
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-50 bg-white">
                <LevelAdaptationInput isLoading={isLoading} handleGenerateText={handleGenerateText} />
            </section>
        </div>
    );
}
