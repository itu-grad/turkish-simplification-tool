export const getWordStem = async (word: string): Promise<string | undefined> => {
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
        return data.results?.[0]?.stems?.[0] ?? undefined;
    } catch (error) {
        console.error("Error fetching word stem:", error);
        return undefined;
    }
};
