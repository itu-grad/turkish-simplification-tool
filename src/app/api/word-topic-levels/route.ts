import { getWordTopicLevel } from "@/app/lib/getWordTopicLevel";

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

        let wordLevelMap: Record<string, string>;
        let topicLevelMap: Record<string, string>;
        [wordLevelMap, topicLevelMap] = await getWordTopicLevel(content);

        return new Response(JSON.stringify([wordLevelMap, topicLevelMap]), {
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
