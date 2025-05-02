export const getWordStem = async (word: string): Promise<string | undefined> => {
    const formData = new URLSearchParams();
    formData.append("word", word);
    formData.append("show_input", "1");

    try {
        const url = process.env.ZEMBEREK_URL;
        if (url) {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                },
                body: formData.toString(),
            });
            const data = await response.json();
            return data.results?.[0]?.stems?.[0] ?? undefined;
        } else {
            throw Error('zemberek url not valid');
        }
    } catch (error) {
        console.error("Error fetching word stem:", error);
        return undefined;
    }
};
