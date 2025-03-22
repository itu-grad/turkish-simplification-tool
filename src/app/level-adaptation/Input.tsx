import { useState } from "react";

interface Props {
    isLoading: boolean;
    handleGenerateText: (formData: { level: string, content: string }) => void;
}

export default function LevelAdaptationInput({ isLoading, handleGenerateText }: Props) {
    const [formData, setFormData] = useState({
        level: "a1",
        content: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        handleGenerateText(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 min-w-[1200px] bg-[#f5f5f5] rounded-xl shadow-lg flex flex-col space-y-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="level" className="text-sm font-semibold text-[#1e1e1e] text-left">Seviye</label>
                    <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-sm text-[#1e1e1e] focus:outline-gray-500"
                    >
                        <option value="a1">A1</option>
                        <option value="a2">A2</option>
                        <option value="b1">B1</option>
                        <option value="b2">B2</option>
                        <option value="c1">C1</option>
                        <option value="c2">C2</option>
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                </div>
                <div className="flex flex-col space-y-2">
                </div>
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="content" className="text-sm font-semibold text-[#1e1e1e] text-left">Metin İçeriği</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md h-40 bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500"
                />
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div></div>
                <div></div>
                <div></div>

                <div className="flex flex-col space-y-2">
                    <button
                        type="submit"
                        className="mt-6 p-3 bg-gray-500 text-white rounded-md transition-all duration-300 hover:scale-105 hover:bg-gray-600 active:scale-95 cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            "Uyarla"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
