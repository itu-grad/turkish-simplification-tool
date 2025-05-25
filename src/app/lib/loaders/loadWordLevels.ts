import fs from "fs";
import path from "path";

let wordLevelsCache: { [key in "yeni-istanbul" | "yeni-hitit"]?: { [word: string]: string } } = {};

export const loadWordLevels = (wordLevelSource: "yeni-istanbul" | "yeni-hitit"): { [word: string]: string } => {
    if (wordLevelsCache[wordLevelSource]) return wordLevelsCache[wordLevelSource]!;

    const filePath = path.join(process.cwd(), "public", "words", `${wordLevelSource}.json`);
    const rawData = fs.readFileSync(filePath, "utf8");
    const levelData: { [level: string]: string[] } = JSON.parse(rawData);

    const wordMap: { [word: string]: string } = {};

    for (const [level, words] of Object.entries(levelData)) {
        for (const word of words) {
            wordMap[word.toLowerCase()] = level;
        }
    }

    wordLevelsCache[wordLevelSource] = wordMap;
    return wordMap;
};
