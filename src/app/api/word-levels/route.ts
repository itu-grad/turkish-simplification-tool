import { getWordLevel } from "@/app/lib/getWordLevel";

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

        const words = content
            .split(/\s+/)
            .map((word: string) => word.toLowerCase().replace(/[^\wçğıöşü]/g, ''));

        const wordLevelMap: Record<string, string> = {};

        for (const word of words) {
            const level = await getWordLevel(word);
            if (level) {
                wordLevelMap[word] = level;
            }
        }

        return new Response(JSON.stringify(wordLevelMap), {
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
