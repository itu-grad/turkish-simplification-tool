interface Feature {
    title: string;
    desc: string;
}

const features: Feature[] = [
    { title: "Metin Üretimi", desc: "Seviyeye uygun düzgün metinler oluşturun." },
    { title: "Metin Analizi", desc: "Bir metnin seviyesini belirleyin." },
    { title: "Seviye Uyarlama", desc: "Metinleri farklı seviyelere uyarlayın!" }
];

export default function Features() {
    return (
        <section className="py-16 bg-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
            {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 shadow-md rounded-lg text-center">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-600 mt-2">{feature.desc}</p>
                </div>
            ))}
        </section>
    );
}
