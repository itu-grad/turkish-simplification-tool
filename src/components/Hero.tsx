interface HeroProps {
  scrollToFeatures: () => void;
  scrollToVideo: () => void;
}

export default function Hero({ scrollToFeatures, scrollToVideo }: HeroProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-primary-bg">
      <h1 className="text-6xl font-bold text-header">Metin Sadeleştirme Aracı</h1>
      <p className="text-2xl text-subheader">Türkçe Dilini Öğretenlerin Yardımcısı</p>
      <div className="mt-12 space-x-4">
        <div className="mt-6 flex flex-wrap justify-center gap-4 animate-fadeInDelay">
          <button
            onClick={scrollToFeatures}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md transition-all duration-300 
                     hover:bg-paragraph hover:scale-105 active:scale-95 cursor-pointer"
          >
            Özellikleri Görün
          </button>

          <button
            onClick={scrollToVideo}
            className="px-6 py-3 border border-gray-800 text-gray-800 rounded-lg shadow-md transition-all duration-300 
                     hover:scale-105 active:scale-95 cursor-pointer"
          >
            Demoyu İzleyin
          </button>
        </div>
      </div>
    </section>
  );
}
