export const formatWord = (word: string): string => {
    return word.toLowerCase().replace(/[^\wçğıöşü]/g, '');
};

export type ZemberekResponse = {
    input: string,
    normalizedInput: string,
    pos: string,
    analysis: string,
    morphemesLexical: string
};