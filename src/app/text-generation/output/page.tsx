import TextGenerationOutputComponent from "./Output";

export default function TextGenerationOutput() {
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
            <section id="text-output" className="min-h-screen flex flex-col items-center justify-center text-center px-50 bg-white">
                <TextGenerationOutputComponent />
            </section>
        </div>
    );
}