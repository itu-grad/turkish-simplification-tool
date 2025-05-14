import fs from "fs";
import path from "path";

let wordLevelsCache: { [key in "yeni-istanbul" | "yeni-hitit"]?: { [word: string]: string } } = {};

export const loadWordLevels = (wordLevelSource: "yeni-istanbul" | "yeni-hitit"): { [word: string]: string } => {
    if (wordLevelsCache[wordLevelSource]) return wordLevelsCache[wordLevelSource]!;

    const levels = ["A1", "A2", "B1", "B2", "C1"];
    const wordMap: { [word: string]: string } = {};

    for (const level of levels) {
        const filePath = path.join(process.cwd(), "public", "words", `${wordLevelSource}`, `${level}.txt`);
        const content = fs.readFileSync(filePath, "utf8");
        const words = content.split(/\r?\n/).map(w => w.trim().toLowerCase()).filter(Boolean);

        for (const word of words) {
            wordMap[word] = level;
        }
    }

    wordLevelsCache[wordLevelSource] = wordMap;
    return wordMap;
};
