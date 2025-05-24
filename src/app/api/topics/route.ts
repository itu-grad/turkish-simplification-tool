import fs from 'fs';
import path from 'path';

export async function GET() {
    const filePath = path.join(process.cwd(), 'public', 'topics', 'yeni-istanbul.json'); // yeni hitit will be added later
    const rawData = fs.readFileSync(filePath, 'utf8');
    const levelData: { [level: string]: string[] } = JSON.parse(rawData);

    const allTopics: string[] = [];

    for (const topics of Object.values(levelData)) {
        allTopics.push(...topics.map(t => t.trim()).filter(Boolean));
    }

    return Response.json({ topics: allTopics });
}
