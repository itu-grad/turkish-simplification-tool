interface Props {
    title: string;
    levelList: { text: string, level: string }[];
    width: number;
}

export default function TableWithLevels({ title, levelList, width }: Props) {
    return (
        <div className="flex-1">
            <h3 className="font-semibold mb-2 text-[#1e1e1e]">{title}</h3>
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                <div className="max-h-[40vh] overflow-y-scroll">
                    {levelList.map((item, index) => (
                        <div key={index} className="flex justify-between py-1 mr-4">
                            <span className="text-gray-700">{item.text}</span>
                            <span className="text-[#1e1e1e]">{item.level}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
