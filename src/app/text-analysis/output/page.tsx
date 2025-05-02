import PageLayout from "@/components/layout/PageLayout";
import TextAnalysisOutputComponent from "./Output";

export default function TextAnalysisOutput() {
    return (
        <PageLayout title="Metin Analizi" content="                
                Metin analizi, mevcut bir metni detaylıca inceleyerek seviyesini belirleyemenize ve içeriği analiz edebilmenize olanak sağlar. 
                Kelime ve gramer yapılarının dökümü sayesinde metnin dil özelliklerini net bir şekilde görebilir, öğrencileriniz için en uygun materyali oluşturabilirsiniz. 
                Böylece, dil seviyesine uygun kaynak seçimi ve geliştirme süreciniz daha bilinçli ve sistematik hale gelir.">
            <TextAnalysisOutputComponent />
        </PageLayout>
    );
}