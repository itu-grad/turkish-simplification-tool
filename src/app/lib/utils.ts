export const formatWord = (word: string): string => {
    return word.toLowerCase().replace(/[^\wçğıöşü]/g, '');
};