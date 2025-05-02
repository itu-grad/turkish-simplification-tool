import { formatWord, ZemberekResponse } from "../utils";

export const getZemberekData = async (content: string, zemberekUrl: string): Promise<ZemberekResponse[]> => {
    const formData = new URLSearchParams();
    formData.append("sentence", content);

    const response = await fetch(zemberekUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: formData.toString(),
    });
    return await response.json();
};

const extractTags = (analysis: string): string[] => {
    const bracketContent = analysis.match(/\[(.*?)\]/);
    const outsideBracket = analysis.replace(/\[.*?\]\s*/, '');

    const tags: Set<string> = new Set();

    if (bracketContent) {
        const morphTag = bracketContent[1].split(':')[1];
        tags.add(morphTag.trim());
    }

    const segments = outsideBracket.split('+');
    for (const seg of segments) {
        const parts = seg.split('|');
        for (const part of parts) {
            const clean = part.trim();
            if (clean && !tags.has(clean)) {
                tags.add(clean);
            }
        }
    }
    return Array.from(tags);
};

export const processZemberekResponse = (
    data: ZemberekResponse[],
    wordLevels: Record<string, string>,
    wordLevelMap: Record<string, string>,
): string[] | undefined => {
    if (data.length === 0) {
        return undefined;
    }
    const tags = [];
    for (const result of data) {
        const analysis = result.analysis;
        const stemRegex = /\[([^\]:]+):/;
        const stemMatch = analysis.match(stemRegex);
        const stem = stemMatch ? stemMatch[1] : null;
        if (stem && wordLevels[stem]) {
            const word = formatWord(result.input);
            wordLevelMap[word] = wordLevels[stem];
        }
        tags.push(...extractTags(analysis));
    }
    return tags;
};