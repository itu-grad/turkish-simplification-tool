export default function About() {
    return (
        <section className="min-h-screen py-16 px-10 bg-white flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-center mb-6 text-[#1e1e1e]">
                Hakkımızda
            </h2>
            <div className="w-full max-w-3xl h-90 overflow-hidden rounded-lg shadow-lg mb-6">
                <img
                    src="/about-image.png"
                    alt="İTÜ DDİ Ekibi"
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <p className="text-gray-700 text-justify max-w-4xl mx-auto leading-relaxed">
                İstanbul Teknik Üniversitesi Doğal Dil İşleme Grubu (İTÜ DDİ), 2000 yılında kurulmuş olup, Türkiye’deki en büyük ve en köklü dil teknolojileri grubudur. İTÜ Bilgisayar ve Bilişim Fakültesi bünyesinde faaliyet gösteren grup, Doç. Dr. Gülşen Eryiğit koordinatörlüğünde 3 öğretim üyesi, 5 araştırma görevlisi ve 30’a yakın lisansüstü ve lisans öğrencisinden oluşmaktadır.
                <br /><br />
                Türkçe doğal dil işleme alanında çalışmalar yürüten grup, araştırmalarını telekom, bankacılık, hukuk ve otomotiv gibi sektörlere uygulamaktadır. Öne çıkan projeleri arasında Web2.0 cümle analizi, Türkçe-İşaret Dili çeviri sistemi, kişisel asistan uygulamaları ve makine çevirisi gibi çalışmalar bulunmaktadır. Ayrıca sanayi iş birlikleriyle bankacılık diyalog sistemleri, hukuksal doküman analizi ve duygu analizi gibi projeler geliştirmektedir.
            </p>
        </section>
    );
}
