import { callPipeline } from './callPipeline';
import { loadTagLevels, TagLevels } from './loadTagLevels';
import { loadWordLevels } from './loadWordLevels';

const formatWord = (word: string): string => {
    return word.toLowerCase().replace(/[^\wçğıöşü]/g, '');
};

const extractTags = (longFormat: string): string[] => {
    const bracketSplit = longFormat.split(']');
    const firstPart = bracketSplit[0].split(':')[1];
    const secondPart = bracketSplit[1].split(':');

    const tags: string[] = [];

    let first = true;
    for (const part of secondPart) {
        if (first) {
            first = false;
            continue;
        }

        const plusParts = part.split('+');
        const relevantParts = plusParts.length > 1 ? plusParts.slice(0, -1) : plusParts;

        for (const item of relevantParts) {
            if (item.includes('|')) continue;

            const arrowSplit = item.split('→');
            tags.push(...arrowSplit);
        }
    }

    const firstTag = firstPart.includes(',') ? firstPart.split(',')[1] : firstPart;
    const allTags = [firstTag, ...tags];
    const uniqueTags = Array.from(new Set(allTags));

    // console.log('TAGS', uniqueTags);
    return uniqueTags;
};

const setTopicLevels = (tags: string[], tagLevels: TagLevels, topicLevelMap: Record<string, string>) => {
    for (const tag of tags) {
        const obj = tagLevels[tag];
        if (obj) {
            topicLevelMap[obj.topic] = obj.level;
        }
    }
}

const getZemberekStemData = async (word: string, zemberekUrl: string): Promise<any> => {
    const formData = new URLSearchParams();
    formData.append("word", word);
    formData.append("show_input", "1");

    const response = await fetch(zemberekUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: formData.toString(),
    });
    return await response.json();
};

const processZemberekResponse = (
    data: any,
    wordLevels: Record<string, string>,
    tagLevels: TagLevels,
    wordLevelMap: Record<string, string>,
    topicLevelMap: Record<string, string>,
    word: string,
) => {
    const results = data.results || [];
    if (results.length === 0) {
        return false;
    }
    let stemFound = false;
    let firstLongFormat = '';
    for (const result of results) {
        const stems: string[] = result.stems || [];
        const longFormat: string = result.long_format || '';
        for (const stem of stems) {
            if (wordLevels[stem]) {
                wordLevelMap[word] = wordLevels[stem];
                if (longFormat) {
                    const tags = extractTags(longFormat);
                    setTopicLevels(tags, tagLevels, topicLevelMap);
                }
                stemFound = true;
                break;
            }
        }
        if (stemFound) {
            break;
        }
        if (!firstLongFormat) {
            firstLongFormat = longFormat;
        }
    }
    if (!stemFound && firstLongFormat) {
        const tags = extractTags(firstLongFormat);
        setTopicLevels(tags, tagLevels, topicLevelMap);
    }
};

const processToolApiResponse = (
    data: string,
    wordLevels: Record<string, string>,
    tagLevels: TagLevels,
    wordLevelMap: Record<string, string>,
    topicLevelMap: Record<string, string>,
) => {
    data.split('\n').forEach(line => {
        if (!line.trim()) return;

        const columns = line.split('\t');
        if (columns.length < 6) return;

        const stem = columns[2];
        const word = formatWord(columns[1]);

        if (wordLevels[stem]) {
            wordLevelMap[word] = wordLevels[stem];
        }

        const morphTags = columns[5]?.split('|') ?? [];

        const tags = [columns[4], ...morphTags].filter(Boolean);
        // console.log('Tags', tags);
        setTopicLevels(tags, tagLevels, topicLevelMap);
    });
};

export const getWordTopicLevel = async (content: string): Promise<[Record<string, string>, Record<string, string>]> => {
    const wordLevelMap: Record<string, string> = {};
    const topicLevelMap: Record<string, string> = {};
    try {
        const wordLevels = loadWordLevels();
        const tagLevels = loadTagLevels();
        const zemberekUrl = process.env.ZEMBEREK_URL;
        const toolsUrl = process.env.API_URL;
        const useZemberek = process.env.USE_ZEMBEREK === 'true';

        if (useZemberek && zemberekUrl) {
            const words = content.split(/\s+/).map(formatWord);
            for (const word of words) {
                const data = await getZemberekStemData(word, zemberekUrl);
                // console.log(data);
                processZemberekResponse(data, wordLevels, tagLevels, wordLevelMap, topicLevelMap, word);
            }
        } else if (toolsUrl) {
            const data = await callPipeline({ input: content });
            processToolApiResponse(data, wordLevels, tagLevels, wordLevelMap, topicLevelMap);
        }
    } catch (error) {
        console.error("Error fetching word and topic levels:", error);
    }
    return [wordLevelMap, topicLevelMap];
};
