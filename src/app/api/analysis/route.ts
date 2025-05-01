import { callPipeline } from "@/app/lib/callPipeline";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { content } = body;

        if (!content) {
            return new Response(JSON.stringify({ error: 'No content provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const responseExample = {
            contentLevel: "B1",
            sentenceLevels: [  // starting from index 0
                "A1",
                "C1",
                "C1",
            ],
            grammarLevels: [
                { text: "duyulan geçmiş zaman", level: "B2" },
                { text: "görülen geçmiş zaman", level: "C2" },
                { text: "sıfat fiil", level: "C2" },
                { text: "olumsuzluk eki", level: "A2" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
                { text: "gelecek zaman", level: "B1" },
                { text: "ayrılma hal eki", level: "B1" }
            ]
        };

        return new Response(JSON.stringify(responseExample), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GET(request: Request) {
  const result = await callPipeline({
    input: "Benim adım Elif. İstanbul’da yaşıyorum. Sabah kahvaltı yaparım, sonra okula giderim. Okulda Türkçe, matematik ve müzik dersleri var. Okuldan sonra arkadaşlarımla oyun oynarım.",
  });
  return new Response(result);
}
