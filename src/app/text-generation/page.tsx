"use client";
import React, { useState } from "react";
import TextGenerationInput from "./Input";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";

export default function TextGeneration() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleGenerateText = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push("/text-generation/output#content");
        }, 2000);
    };

    return (
        <PageLayout title="Metin Üretimi" content="
                Metin üretimi, öğretmenlere özel olarak tasarlanmış güçlü bir araçtır.
                Belirlediğiniz seviye, kelime sayısı, tema, hedef kelimeler ve gramer yapıları doğrultusunda özgün ve seviyeye uygun metinler oluşturur.
                Alternatif metinler sunarak en uygun içeriği seçmenize yardımcı olur.
                Ayrıca, üretilen metinlerde kullanılan kelime ve dilbilgisi yapılarını detaylı şekilde listeleyerek öğretim süreçlerini daha verimli hale getirir.">
            <TextGenerationInput isLoading={isLoading} handleGenerateText={handleGenerateText} />
        </PageLayout>
    );
}
