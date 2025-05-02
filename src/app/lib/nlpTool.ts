import { formatWord } from "./utils";

export enum NlpTool {
    Ner = "ner",
    MorphAnalyzer = "morphanalyzer",
    IsTurkish = "isturkish",
    MorphGenerator = "morphgenerator",
    SentenceSplitter = "sentencesplitter",
    Tokenizer = "tokenizer",
    Normalize = "normalize",
    Deasciifier = "deasciifier",
    Vowelizer = "Vowelizer",
    DepParserFormal = "DepParserFormal",
    DepParserNoisy = "DepParserNoisy",
    SpellCheck = "spellcheck",
    Disambiguator = "disambiguator",
    PipelineFormal = "pipelineFormal",
    PipelineNoisy = "pipelineNoisy",
    PipelineFormalWithSplitter = "pipelineFormalwSentenceSplitter",
    PipelineNoisyWithSplitter = "pipelineNoisywSentenceSplitter",
    PipelineSSMorph = "pipelineSSMorph",
}

export async function getToolData({
    tool = NlpTool.PipelineFormal,
    input,
}: {
    tool?: string;
    input: string;
}): Promise<string> {
    const token = process.env.PIPELINE_TOKEN;
    const url = process.env.API_URL;
    if (!token || !url) {
        throw new Error('Token or api url is invalid');
    }

    const params = new URLSearchParams({
        tool,
        input,
        token,
    });
    const apiUrl = `${url}?${params.toString()}`;
    // console.log('[DEBUG] Request URL:', apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    return await response.text();
}

export const processToolApiResponse = (
    data: string,
    wordLevels: Record<string, string>,
    wordLevelMap: Record<string, string>,
): string[] => {
    const tags: string[] = [];
    data.split('\n').forEach(line => {
        if (!line.trim()) return;

        const columns = line.split('\t');
        if (columns.length < 6) return;

        const stem = columns[2];

        if (columns[1] === '_') return;
        const word = formatWord(columns[1]);

        if (wordLevels[stem]) {
            wordLevelMap[word] = wordLevels[stem];
        }

        const firstTag = [columns[3], columns[4]].join(',');
        const morphTags = columns[5]?.split('|') ?? [];

        tags.push(...[firstTag, ...morphTags].filter(Boolean));
        // console.log('Tags', tags);
    });
    return Array.from(new Set(tags));
};