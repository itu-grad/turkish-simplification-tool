interface HeroProps {
  scrollToFeatures: () => void;
  scrollToVideo: () => void;
}

export default function Hero({ scrollToFeatures, scrollToVideo }: HeroProps) {
  return (
    <section className="text-center py-20 bg-gray-200">
      <h1 className="text-4xl font-bold text-[#1e1e1e]">Metin Sadeleştirme Aracı</h1>
      <p className="text-lg text-gray-600">Türkçe Dilini Öğretenlerin Yardımcısı</p>
      <div className="mt-6 space-x-4">
        <div className="mt-6 space-x-4">
          {/* Features Button */}
          <button
            onClick={scrollToFeatures}
            className="px-6 py-2 bg-gray-800 text-white rounded transition-all duration-300 ease-in-out 
                     hover:bg-gray-700 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Özellikleri Görün
          </button>

          {/* Video Button */}
          <button
            onClick={scrollToVideo}
            className="px-6 py-2 border border-gray-800 text-gray-800 rounded transition-all duration-300 ease-in-out 
                     hover:scale-105 active:scale-95 cursor-pointer"
          >
            Demoyu İzleyin
          </button>
        </div>
      </div>
    </section>
  );
}
