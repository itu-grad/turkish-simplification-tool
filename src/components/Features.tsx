import Link from "next/link";
import { FaArrowRight, FaFileAlt, FaSearch, FaSyncAlt } from "react-icons/fa";

interface Feature {
    title: string;
    desc: string;
    link: string;
    icon: React.ReactNode;
}

const features: Feature[] = [
    {
        title: "Metin Üretimi",
        desc: "Seviyeye uygun özgün metinler oluşturun!<br />Belirlediğiniz kriterlere göre alternatif metinler üretin ve kullanılan kelime ile dilbilgisi yapılarını detaylıca görün.",
        link: "text-generation",
        icon: <FaFileAlt className="text-4xl text-blue-500" />
    },
    {
        title: "Metin Analizi",
        desc: "Bir metnin seviyesini belirleyin!<br />Kelime ve gramer yapılarını analiz ederek içeriklerinizi daha bilinçli seçin ve geliştirin.",
        link: "text-analysis",
        icon: <FaSearch className="text-4xl text-green-500" />
    },
    {
        title: "Seviye Uyarlama",
        desc: "Metinleri farklı seviyelere uyarlayın!<br />Orijinal ve uyarlanmış metinleri karşılaştırarak öğrencileriniz için en uygun içeriği hazırlayın.",
        link: "level-adaptation",
        icon: <FaSyncAlt className="text-4xl text-orange-500" />
    }
];

export default function Features() {
    return (
        <section className="min-h-screen py-16 bg-primary-bg grid grid-cols-1 md:grid-cols-3 gap-6 px-10 items-center">
            {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 max-h-[70vh] shadow-md rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
                    <div className="mb-16 flex justify-center">
                        {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-header mb-10">{feature.title}</h3>
                    <p
                        className="text-paragraph mt-2"
                        dangerouslySetInnerHTML={{ __html: feature.desc }}
                    ></p>
                    <div className="mt-16 flex justify-center">
                        <Link href={feature.link}>
                            <FaArrowRight className="text-gray-600 text-2xl cursor-pointer hover:text-link" />
                        </Link>
                    </div>
                </div>
            ))}
        </section>
    );
}
