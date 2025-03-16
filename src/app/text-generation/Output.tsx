export default function TextGenerationOutput() {
    return (
        <div className="p-8 min-w-[1200] bg-[#f5f5f5] rounded-xl shadow-lg flex flex-col space-y-6 mt-10 mb-10">
            <div className="text-2xl font-medium text-[#1e1e1e]">Üretilen Metin</div>
            <div className="p-6 bg-white rounded-md shadow-sm">
                <p className="text-[#1e1e1e] text-justify">
                    Şehrin en önemli yerlerinden birisi de çöplükleridir. Çöplükler şehirler için gereklidir
                    evet ama bu kadar önemli olduklarını hiç düşündünüz mü? Bir büyük şehir çöplüğünü
                    görünceye kadar bunu ben de bilmiyordum. Bir çöplük, bence bir şehir demektir.
                    İstanbul güzel şehir. İstanbul’un boy boy, renk renk resimleri yapılmıştır yıllar boyu.
                    Fotoğrafları çekilmiştir. Onunla ilgili şiirler yazılmıştır. Bunların birçoğunu gördüm,
                    okudum. Ama ben size söylüyorum, hiçbir şey, hiç kimse İstanbul’u bana çöplükleri
                    kadar anlatmadı. Neden çöplükleri böylesine yakından bilirim? Ben çöplük uzmanı
                    değilim. Sebebini söyleyeyim. Bir, ben martıları çok severim… Hayır, daha çok onların
                    hayatlarını merak ederim. Giderim, saatlerce onları seyrederim… Bir deniz üstünde, bir
                    kayalıkta, bir çöplükte. Martıların hayat kavgaları en çok çöplüklerde olur. Çöplüklere
                    ilk ilgim martılardan dolayıdır. Çöplüklere ikinci ilgim de bizim komşu Rüstem Çavuş’tan dolayıdır. Rüstem Çavuş uzun bıyıklı, canlı, şakacı, hayat dolu, sevgi dolu bir
                    kişidir. Sivaslıdır. On yıldır da İstanbul’da çöpçüdür. Dört yıl önce çöpçü çavuşluğuna
                    terfi etti.
                </p>
            </div>

            <div className="text-xl font-medium text-[#1e1e1e] mt-6">Kullanılan Kelimeler</div>
            <div className="grid grid-cols-4 gap-4 p-6 bg-white rounded-md shadow-sm">
                <div className="text-[#1e1e1e]">Z - zürafa</div>
                <div className="text-[#1e1e1e]">K - kendi</div>
                <div className="text-[#1e1e1e]">G - gelişim</div>
                <div className="text-[#1e1e1e]">Y - yolculuk</div>
            </div>

            <div className="text-xl font-medium text-[#1e1e1e] mt-6">Kullanılan Gramer Yapıları</div>
            <div className="p-6 bg-white rounded-md shadow-sm">
                <ul className="text-[#1e1e1e] text-left list-disc list-inside">
                    <li>Geçmiş zaman</li>
                    <li>Sıfat fiil</li>
                    <li>Olumsuzluk eki</li>
                    <li>Gelecek zaman</li>
                </ul>
            </div>
        </div>
    );
}