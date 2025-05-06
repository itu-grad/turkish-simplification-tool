import { getWordStems } from "@/app/lib/fetchers/getWordStems";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { content } = body;
        if (!content) {
            return new Response('Bad content', {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const words = await getWordStems(content);
        console.log(words);
        return new Response(JSON.stringify(words), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
