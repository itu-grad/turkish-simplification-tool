import fs from "fs";
import path from "path";

export async function GET(req: Request) {
    try {
        const filePath = path.join(process.cwd(), "public", "example-texts.txt");
        const content = fs.readFileSync(filePath, "utf8");
        const texts = content.split(/\n/);

        const { searchParams } = new URL(req.url);
        const prevIndex = Number(searchParams.get("prev"));
        let randomIndex = Math.floor(Math.random() * texts.length);

        if (!isNaN(prevIndex) && texts.length > 1) {
            while (randomIndex === prevIndex) {
                randomIndex = Math.floor(Math.random() * texts.length);
            }
        }

        const randomText = texts[randomIndex];
        return new Response(
            JSON.stringify({ content: randomText, index: randomIndex }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
