import { saveAs } from "file-saver";

export const handleDownloadExcel = async (
    matchedWords: Record<string, string>,
    matchedGrammars: Record<string, string>,
    content: string,
    loading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    loading(true);
    try {
        const res = await fetch("/api/analysis/download-excel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                matchedWords,
                matchedGrammars,
                content: content,
            }),
        });
        const blob = await res.blob();
        saveAs(blob, "analysis.xlsx");
    } catch (error) {
        console.error("Download failed:", error);
    } finally {
        loading(false);
    }
};
