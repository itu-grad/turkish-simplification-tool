import Image from "next/image";

export default function About() {
    return (
        <section className="min-h-screen py-16 px-10 bg-secondary-bg flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-center mb-6 text-header">
                Hakkımızda
            </h2>
            <div className="relative w-full max-w-3xl h-[360px] overflow-hidden rounded-lg shadow-lg mb-6">
                <Image
                    src="/about-image.png"
                    alt="İTÜ DDİ Ekibi"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                />
            </div>
            <p className="text-paragraph text-justify max-w-4xl mx-auto leading-relaxed">
                İstanbul Teknik Üniversitesi Doğal Dil İşleme Grubu (İTÜ DDİ), 2000 yılında kurulmuş olup, Türkiye’deki en büyük ve en köklü dil teknolojileri grubudur. İTÜ Bilgisayar ve Bilişim Fakültesi bünyesinde faaliyet gösteren grup, Doç. Dr. Gülşen Eryiğit koordinatörlüğünde 3 öğretim üyesi, 5 araştırma görevlisi ve 30’a yakın lisansüstü ve lisans öğrencisinden oluşmaktadır.
                <br /><br />
                Türkçe doğal dil işleme alanında çalışmalar yürüten grup, araştırmalarını telekom, bankacılık, hukuk ve otomotiv gibi sektörlere uygulamaktadır. Öne çıkan projeleri arasında Web2.0 cümle analizi, Türkçe-İşaret Dili çeviri sistemi, kişisel asistan uygulamaları ve makine çevirisi gibi çalışmalar bulunmaktadır. Ayrıca sanayi iş birlikleriyle bankacılık diyalog sistemleri, hukuksal doküman analizi ve duygu analizi gibi projeler geliştirmektedir.
            </p>
            <a
                href="https://nlp.itu.edu.tr/hakkimizda"
                target="_blank"
                className="text-link mt-4 text-right w-full max-w-4xl mx-auto leading-relaxed block"
            >
                Daha fazlası için tıklayın.
            </a>
        </section>
    );
}
