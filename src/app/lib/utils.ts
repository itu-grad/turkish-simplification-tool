export const formatWord = (word: string): string => {
    return word.toLowerCase().replace(/[^\wçğıöşü]/g, '');
};

export const isAlphabetic = (word: string) => /^[a-zA-ZğüşıöçĞÜŞİÖÇ]+$/.test(word);

export type ZemberekResponse = {
    input: string,
    normalizedInput: string,
    pos: string,
    analysis: string,
    morphemesLexical: string
};

export type ZemberekWord = { original: string; cleaned: string; stem: string };