import fs from "fs";
import path from "path";

let wordLevels: { [word: string]: string } | null = null;

export const loadWordLevels = (): { [word: string]: string } => {
    if (wordLevels) return wordLevels;

    const levels = ["A1", "A2", "B1", "B2", "C1"];
    const wordMap: { [word: string]: string } = {};

    for (const level of levels) {
        const filePath = path.join(process.cwd(), "public", "words", `${level}.txt`);
        const content = fs.readFileSync(filePath, "utf8");
        const words = content.split(/\r?\n/).map(w => w.trim().toLowerCase()).filter(Boolean);

        for (const word of words) {
            wordMap[word] = level;
        }
    }

    wordLevels = wordMap;
    return wordMap;
};
