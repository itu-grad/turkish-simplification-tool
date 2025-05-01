import { getWordStem } from "@/app/lib/getWordStem";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { content } = body;

        const result: { original: string; cleaned: string; stem: string }[] = [];

        if (content) {
            const words = content.split(/\s+/);

            for (const original of words) {
                const cleaned = original
                    .toLowerCase()
                    .replace(/[^\wçğıöşü]/g, '');

                if (!cleaned) continue;

                const stem = await getWordStem(cleaned);
                if (stem) {
                    result.push({ original, cleaned, stem });
                }
            }
        }

        return new Response(JSON.stringify(result), {
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
