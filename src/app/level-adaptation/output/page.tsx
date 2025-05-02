import PageLayout from "@/components/layout/PageLayout";
import LevelAdaptationOutputComponent from "./Output";

export default function LevelAdaptationOutput() {
    return (
        <PageLayout title="Seviye Uyarlama" content="                
                Seviye uyarlama, herhangi bir metni belirlediğiniz seviyeye uyarlayarak öğretmenlerin ders materyali oluşturma sürecini kolaylaştırır.
                Orijinal metin ile uyarlanmış metni yan yana inceleyebilir, farklı seviyelere uygun alternatifler arasından seçim yapabilirsiniz.
                Böylece, öğrencilerinizin seviyesine uygun, anlam bütünlüğünü koruyan ve etkili öğrenme sağlayan içerikler hazırlamanız mümkün hale gelir.">
            <LevelAdaptationOutputComponent />
        </PageLayout>
    );
}