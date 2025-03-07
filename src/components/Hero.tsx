interface HeroProps {
    scrollToFeatures: () => void;
    scrollToVideo: () => void;
  }
  
  export default function Hero({ scrollToFeatures, scrollToVideo }: HeroProps) {
    return (
      <section className="text-center py-20 bg-gray-200">
        <h1 className="text-4xl font-bold">Metin Sadeleştirme Aracı</h1>
        <p className="text-lg text-gray-600">Türkçe Dilini Öğretenlerin Yardımcısı</p>
        <div className="mt-6 space-x-4">
          <button onClick={scrollToFeatures} className="px-6 py-2 bg-gray-800 text-white rounded">
            Özellikleri Görün
          </button>
          <button onClick={scrollToVideo} className="px-6 py-2 border border-gray-800 text-gray-800 rounded">
            Demoyu İzleyin
          </button>
        </div>
      </section>
    );
  }
  