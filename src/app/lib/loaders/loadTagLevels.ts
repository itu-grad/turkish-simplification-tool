import fs from "fs";
import path from "path";

type TopicMapping = {
    tag: string;
    topic: string;
    level: string;
};

export type TagLevels = {
    [tag: string]: {
        topic: string;
        level: string;
    };
};

let tagLevels: TagLevels | null = null;

export const loadTagLevels = (): TagLevels => {
    if (tagLevels) return tagLevels;

    const filePath = path.join(process.cwd(), "public", "topics/morph-mappings.json");
    const content = fs.readFileSync(filePath, "utf8");
    const { mappings } = JSON.parse(content) as { mappings: TopicMapping[] };

    tagLevels = mappings.reduce((acc, { tag, topic, level }) => {
        acc[tag] = { topic, level };
        return acc;
    }, {} as TagLevels);

    return tagLevels;
};