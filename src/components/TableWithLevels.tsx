interface Props {
    title: string;
    levelList: Record<string, string>;
    width: number;
}

export default function TableWithLevels({ title, levelList, width }: Props) {
    return (
        <div className="flex-1">
            <h3 className="font-semibold mb-2 text-header">{title}</h3>
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                <div className="max-h-[40vh] overflow-y-scroll">
                    {Object.entries(levelList).map((item, index) => {
                        if (item[1]) {
                            return (
                                <div key={index} className="flex justify-between py-1 mr-4">
                                    <span className="text-paragraph">{item[0]}</span>
                                    <span className="text-header">{item[1]}</span>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}
