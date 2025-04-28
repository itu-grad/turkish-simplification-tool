export const highlightTargetWords = (text: string, targetWords: string[]) => {
    if (!targetWords?.length) return text;

    const locale = "tr-TR";
    const parts = [];
    let lastIndex = 0;

    const escapedWords = targetWords.map(word =>
        word.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    );

    const regex = new RegExp(
        `(?:^|\\P{L})(${escapedWords.join('|')})(?=\\P{L}|$)`,
        'giu'
    );

    for (const match of text.matchAll(regex)) {
        const matchText = match[1];
        const matchIndex = match.index ?? 0;
        const prefixLength = match[0].length - matchText.length;

        const actualIndex = matchIndex + prefixLength;

        if (lastIndex < actualIndex) {
            parts.push(text.slice(lastIndex, actualIndex));
        }

        parts.push(
            <span
                key={actualIndex}
                className="underline decoration-yellow-400 decoration-2 underline-offset-2 font-medium"
            >
                {matchText}
            </span>
        );

        lastIndex = actualIndex + matchText.length;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts;
};
