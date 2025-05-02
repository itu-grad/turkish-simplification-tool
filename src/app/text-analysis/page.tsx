"use client";
import React, { useState } from "react";
import TextAnalysisInput from "./Input";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";

export default function TextAnalysis() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleAnalyzeText = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push("/text-analysis/output#content");
        }, 2000);
    };

    return (
        <PageLayout title="Metin Analizi" content="                
                Metin analizi, mevcut bir metni detaylıca inceleyerek seviyesini belirleyemenize ve içeriği analiz edebilmenize olanak sağlar. 
                Kelime ve gramer yapılarının dökümü sayesinde metnin dil özelliklerini net bir şekilde görebilir, öğrencileriniz için en uygun materyali oluşturabilirsiniz. 
                Böylece, dil seviyesine uygun kaynak seçimi ve geliştirme süreciniz daha bilinçli ve sistematik hale gelir.">
            <TextAnalysisInput isLoading={isLoading} handleAnalyzeText={handleAnalyzeText} />
        </PageLayout>
    );
}
