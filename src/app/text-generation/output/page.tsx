import PageLayout from "@/components/PageLayout";
import TextGenerationOutputComponent from "./Output";

export default function TextGenerationOutput() {
    return (
        <PageLayout title="Metin Üretimi" content="
                Metin üretimi, öğretmenlere özel olarak tasarlanmış güçlü bir araçtır.
                Belirlediğiniz seviye, kelime sayısı, tema, hedef kelimeler ve gramer yapıları doğrultusunda özgün ve seviyeye uygun metinler oluşturur.
                Alternatif metinler sunarak en uygun içeriği seçmenize yardımcı olur.
                Ayrıca, üretilen metinlerde kullanılan kelime ve dilbilgisi yapılarını detaylı şekilde listeleyerek öğretim süreçlerini daha verimli hale getirir.">
            <TextGenerationOutputComponent />
        </PageLayout>
    );
}