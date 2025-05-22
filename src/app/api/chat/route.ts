import OpenAI from "openai";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { content } = body;
        const prompt = `Beşli anlatı şemasından yararlanarak yalnızca verilen metnin iletisi ile ilgisi olmayan tamamen vazgeçilebilir cümleleri sil. Bu cümleler, çıkarıldığında metnin akışı hiçbir şekilde bozulmayan cümleler olmalıdır.

        Beşli anlatı şeması şunlardan oluşur:
        1. Başlangıç Durumu: Kurulu bir düzenin varlığı belirtilmektedir. Söz konusu düzenle ilgili kişi, zaman ve uzam betimlenmektedir.
        2. Dönüştürücü Öğe (Düğüm): Sözü edilen düzeni bozan bir olay gelişmektedir.
        3. Dinamik Olaylar Zinciri (Eylem): Dönüştürücü ögeyle gelen yeni olayları içermektedir.
        4. Onarıcı/Dengeleyici Öğe: Düzenin bozulmasına neden olan sorun, çözüme ulaştırılır.
        5. Bitiş Durumu: Dengenin kurulmasıyla ya başlangıç durumuna dönülmektedir ya da yeni bir durum ortaya çıkmaktadır.

        Silmediğin cümlelerde bir değişiklik yapma. Metnin son cümlesini silme. Satır yapısını ve paragraf düzenini olduğu gibi koru. Yalnızca sadeleştirilmiş içerikleri döndür.

        Aşağıdaki metne ait üç farklı sadeleştirme alternatifi üret ve çıktıyı aşağıdaki JSON formatında ver:

        {
        "alternatives": [
            {
            "id": 1,
            "text": "Sadeleştirilmiş Alternatif 1 metni buraya gelecek"
            },
            {
            "id": 2,
            "text": "Sadeleştirilmiş Alternatif 2 metni buraya gelecek"
            },
            {
            "id": 3,
            "text": "Sadeleştirilmiş Alternatif 3 metni buraya gelecek"
            }
        ]
        }

        Özgün Metin:
        ${content}`;

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const response = await client.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.8,
        });
        if (!response) {
            return new Response('Bad content', {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        if (response.choices[0].message.content) {
            return new Response(JSON.stringify(JSON.parse(response.choices[0].message.content)), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response('Bad content', {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
