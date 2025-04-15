import fs from 'fs';
import path from 'path';

export async function GET() {
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
    const allTopics: string[] = [];

    for (const level of levels) {
        const filePath = path.join(process.cwd(), 'public', 'topics', `${level}.txt`);
        const content = fs.readFileSync(filePath, 'utf8');
        const topics = content
            .split(/\r?\n/)
            .map((t) => t.trim())
            .filter(Boolean);
        allTopics.push(...topics);
    }

    return Response.json({ topics: allTopics });
}
