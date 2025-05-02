interface Props {
    title: string;
    levelList: Record<string, string>;
}

export default function TableWithLevels({ title, levelList }: Props) {
    const isEmpty = Object.keys(levelList).length === 0;

    return (
        <div className="flex-1">
            <h3 className="font-semibold mb-2 text-header">{title}</h3>
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                <div className="max-h-[40vh] overflow-y-scroll">
                    {isEmpty ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-subheader"></div>
                        </div>
                    ) : (
                        Object.entries(levelList).map(([word, level], index) =>
                            level ? (
                                <div key={index} className="flex justify-between py-1 mr-4">
                                    <span className="text-paragraph">{word}</span>
                                    <span className="text-header">{level}</span>
                                </div>
                            ) : null
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
