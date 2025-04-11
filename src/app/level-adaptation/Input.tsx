import SubmitButton from "@/components/SubmitButton";
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
        <form onSubmit={handleSubmit} className="p-8 min-w-[1200px] bg-primary-bg rounded-xl shadow-lg flex flex-col space-y-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="level" className="text-sm font-semibold text-header text-left">Seviye</label>
                    <select
                        id="level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md bg-secondary-bg text-sm text-header focus:outline-gray-500"
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
                <label htmlFor="content" className="text-sm font-semibold text-header text-left">Metin İçeriği</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md h-40 bg-secondary-bg text-header focus:outline-gray-500"
                />
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div></div>
                <div></div>
                <div></div>

                <div className="flex flex-col space-y-2">
                    <SubmitButton
                        isLoading={isLoading}
                        text="Uyarla"
                        type="submit"
                    />
                </div>
            </div>
        </form>
    );
}
