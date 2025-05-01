import { callPipeline } from './callPipeline';
import { loadWordLevels } from './loadWordLevels';

const formatWord = (word: string): string => {
    return word.toLowerCase().replace(/[^\wçğıöşü]/g, '');
};

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
    wordLevelMap: Record<string, string>,
    word: string
): boolean => {
    const results = data.results || [];
    if (results.length === 0) {
        return false;
    }

    let stemFound = false;
    for (const result of results) {
        const stems: string[] = result.stems || [];
        for (const stem of stems) {
            if (wordLevels[stem]) {
                wordLevelMap[word] = wordLevels[stem];
                stemFound = true;
                break;
            }
        }
        if (stemFound) {
            break;
        }
    }
    return stemFound;
};

const processToolApiResponse = (data: string, wordLevels: Record<string, string>, wordLevelMap: Record<string, string>) => {
    data.split('\n').forEach(line => {
        const columns = line.split('\t');
        const stem = columns[2];
        const word = formatWord(columns[1]);
        if (wordLevels[stem]) {
            wordLevelMap[word] = wordLevels[stem];
        }
    });
};

export const getWordLevel = async (content: string): Promise<Record<string, string>> => {
    const wordLevelMap: Record<string, string> = {};
    try {
        const wordLevels = loadWordLevels();
        const zemberekUrl = process.env.ZEMBEREK_URL;
        const toolsUrl = process.env.API_URL;
        const useZemberek = process.env.USE_ZEMBEREK === 'true';

        if (useZemberek && zemberekUrl) {
            const words = content.split(/\s+/).map(formatWord);
            for (const word of words) {
                const data = await getZemberekStemData(word, zemberekUrl);
                if (!processZemberekResponse(data, wordLevels, wordLevelMap, word)) {
                    continue;
                }
            }
        } else if (toolsUrl) {
            const data = await callPipeline({ input: content });
            processToolApiResponse(data, wordLevels, wordLevelMap);
        }

        return wordLevelMap;
    } catch (error) {
        console.error("Error fetching word levels:", error);
        return wordLevelMap;
    }
};
