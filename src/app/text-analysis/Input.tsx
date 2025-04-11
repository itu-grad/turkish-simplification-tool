import SubmitButton from "@/components/SubmitButton";
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
            className="p-8 min-w-[1200px] rounded-xl flex flex-col space-y-6 min-h-screen"
        >
            <div className="w-full min-w-[400px] flex items-center justify-center p-4 flex-grow">
                <div className="w-full max-w-[1200px] bg-primary-bg p-6 rounded-lg shadow-md flex flex-col min-h-[60vh]">
                    <div className="flex flex-col space-y-2 flex-grow">
                        <textarea
                            id="content"
                            className="p-2 border border-gray-300 rounded-md bg-secondary-bg text-header focus:outline-gray-500 flex-grow"
                            placeholder="Metin giriniz..."
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <SubmitButton
                            isLoading={isLoading}
                            text="Analiz Et"
                            type="submit"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
