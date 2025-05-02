"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LevelAdaptationInput from "./Input";
import PageLayout from "@/components/layout/PageLayout";

export default function LevelAdaptation() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleGenerateText = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push("/level-adaptation/output#content");
        }, 2000);
    };

    return (
        <PageLayout title="Seviye Uyarlama" content="                
                Seviye uyarlama, herhangi bir metni belirlediğiniz seviyeye uyarlayarak öğretmenlerin ders materyali oluşturma sürecini kolaylaştırır.
                Orijinal metin ile uyarlanmış metni yan yana inceleyebilir, farklı seviyelere uygun alternatifler arasından seçim yapabilirsiniz.
                Böylece, öğrencilerinizin seviyesine uygun, anlam bütünlüğünü koruyan ve etkili öğrenme sağlayan içerikler hazırlamanız mümkün hale gelir.">
            <LevelAdaptationInput isLoading={isLoading} handleGenerateText={handleGenerateText} />
        </PageLayout>
    );
}
