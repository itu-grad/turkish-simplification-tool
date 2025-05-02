import { loadTagLevels, TagLevels } from './loadTagLevels';
import { loadWordLevels } from './loadWordLevels';
import { getToolData, processToolApiResponse } from './nlpTool';
import { getZemberekData, processZemberekResponse } from './zemberek';

const setTopicLevels = (tags: string[], tagLevels: TagLevels, topicLevelMap: Record<string, string>) => {
    for (const tag of tags) {
        const obj = tagLevels[tag];
        if (obj) {
            topicLevelMap[obj.topic] = obj.level;
        }
    }
}

export const getWordTopicLevel = async (content: string): Promise<[Record<string, string>, Record<string, string>]> => {
    const wordLevelMap: Record<string, string> = {};
    const topicLevelMap: Record<string, string> = {};
    try {
        const wordLevels = loadWordLevels();
        const tagLevels = loadTagLevels();
        const zemberekUrl = process.env.ZEMBEREK_URL;
        const toolsUrl = process.env.API_URL;
        const useZemberek = process.env.USE_ZEMBEREK === 'true';
        let tags: string[] | undefined = [];

        if (useZemberek && zemberekUrl) {
            const data = await getZemberekData(content, zemberekUrl);
            // console.log(data);
            tags = processZemberekResponse(data, wordLevels, wordLevelMap);
        } else if (toolsUrl) {
            const data = await getToolData({ input: content });
            tags = processToolApiResponse(data, wordLevels, wordLevelMap);
        }
        if (tags) {
            setTopicLevels(tags, tagLevels, topicLevelMap);
        }
    } catch (error) {
        console.error("Error fetching word and topic levels:", error);
    }
    return [wordLevelMap, topicLevelMap];
};
