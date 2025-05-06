import { getZemberekData, processZemberekResponseStems } from "../tools/zemberek";
import { ZemberekWord } from "../utils";

export const getWordStems = async (content: string): Promise<ZemberekWord[] | undefined> => {
    try {
        const url = process.env.ZEMBEREK_URL;
        if (url) {
            const response = await getZemberekData(content, url);
            const data = processZemberekResponseStems(response);
            return data ?? undefined;
        } else {
            throw Error('zemberek url not valid');
        }
    } catch (error) {
        console.error("Error fetching word stems:", error);
        return undefined;
    }
};
