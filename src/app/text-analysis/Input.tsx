import { useState } from "react";

interface Props {
    isLoading: boolean;
    handleAnalyzeText: () => void;
}

export default function TextInput({ isLoading, handleAnalyzeText }: Props) {
    const [content, setContent] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Analyzing Text:", content);
        handleAnalyzeText();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-8 min-w-[1200px] bg-white rounded-xl flex flex-col space-y-6 min-h-screen"
        >
            <div className="w-full min-w-[400px] flex items-center justify-center p-4 flex-grow">
                <div className="w-full max-w-[1200px] bg-[#f5f5f5] p-6 rounded-lg shadow-md flex flex-col min-h-[60vh]">
                    <div className="flex flex-col space-y-2 flex-grow">
                        <textarea
                            id="content"
                            className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500 flex-grow"
                            placeholder="Metin giriniz..."
                        />
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            className="p-3 bg-gray-500 text-white rounded-md transition-all duration-300 
                                    hover:scale-105 hover:bg-gray-600 active:scale-95 cursor-pointer"
                            onClick={handleAnalyzeText}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                </div>
                            ) : (
                                "Analiz Et"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
