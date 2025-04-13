import { loadWordLevels } from './loadWordLevels';

export const getWordLevel = async (word: string): Promise<string | undefined> => {
    const formData = new URLSearchParams();
    formData.append("word", word);
    formData.append("show_input", "1");

    try {
        const response = await fetch("http://localhost:4567/stems", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
            body: formData.toString(),
        });

        const data = await response.json();
        console.log("Stemmed Data:", data);

        const results = data.results || [];
        const wordLevels = loadWordLevels();

        if (results.length === 0) {
            return undefined;
        }

        for (const result of results) {
            const stems: string[] = result.stems || [];
            for (const stem of stems) {
                if (wordLevels[stem]) {
                    console.log("Matched stem:", stem);
                    return wordLevels[stem];
                }
            }
        }

        console.warn("No matching stem found in word levels.");
        return undefined;

    } catch (error) {
        console.error("Error fetching word levels:", error);
        return undefined;
    }
};
