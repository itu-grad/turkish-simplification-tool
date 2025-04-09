import { TagInput } from "@/components/TagInput";
import { useTextGenerationFormStore } from "@/stores/textGenerationStore";
import { useState } from "react";

interface Props {
    isLoading: boolean;
    handleGenerateText: () => void;
}

export default function TextGenerationInput({ isLoading, handleGenerateText }: Props) {
    const { setAlternatives, setFormData } = useTextGenerationFormStore();

    const [formData, setFormState] = useState({
        level: "a1",
        wordCount: "",
        theme: "",
        content: "",
        targetWords: [] as string[],
        targetGrammar: [] as string[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddTag = (tags: string[], type: "targetWords" | "targetGrammar") => {
        if (tags) {
            setFormState((prevState) => ({
                ...prevState,
                [type]: tags,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        setFormData(formData);
        const alternatives = [  // assume it is the response from the api
            {
                text: "Sehrin en önemli yerlerinden birisi de çöplükleridir. Çöplükler şehirler için gereklidir evet ama bu kadar önemli olduklarını hiç düşündünüz mü?",
                words: [
                    { text: "göz", level: "A2" },
                    { text: "köşk", level: "B2" },
                    { text: "taraf", level: "C2" },
                    { text: "temel", level: "A1" },
                    { text: "tavuk", level: "A1" },
                    { text: "peri", level: "A1" },
                ],
                grammar: [
                    { text: "duyulan geçmiş zaman", level: "B2" },
                    { text: "görülen geçmiş zaman", level: "C2" },
                    { text: "sıfat fiil", level: "C2" },
                    { text: "olumsuzluk eki", level: "A2" },
                    { text: "gelecek zaman", level: "B1" },
                    { text: "gelecek zaman", level: "B1" },
                ]
            },
            {
                text: "İstanbul güzel şehir. İstanbul’un boy boy, renk renk resimleri yapılmıştır yıllar boyu.",
                words: [
                    { text: "göz", level: "A2" },
                    { text: "köşk", level: "B2" },
                    { text: "taraf", level: "C2" },
                    { text: "temel", level: "A1" },
                    { text: "tavuk", level: "A1" },
                    { text: "peri", level: "A1" },
                ],
                grammar: [
                    { text: "duyulan geçmiş zaman", level: "B2" },
                    { text: "görülen geçmiş zaman", level: "C2" },
                    { text: "sıfat fiil", level: "C2" },
                    { text: "olumsuzluk eki", level: "A2" },
                    { text: "gelecek zaman", level: "B1" },
                    { text: "gelecek zaman", level: "B1" },
                ]
            },
            {
                text: "Bir çöplük, bence bir şehir demektir. Martıların hayat kavgaları en çok çöplüklerde olur.",
                words: [
                    { text: "göz", level: "A2" },
                    { text: "köşk", level: "B2" },
                    { text: "taraf", level: "C2" },
                    { text: "temel", level: "A1" },
                    { text: "tavuk", level: "A1" },
                    { text: "peri", level: "A1" },
                ],
                grammar: [
                    { text: "duyulan geçmiş zaman", level: "B2" },
                    { text: "görülen geçmiş zaman", level: "C2" },
                    { text: "sıfat fiil", level: "C2" },
                    { text: "olumsuzluk eki", level: "A2" },
                    { text: "gelecek zaman", level: "B1" },
                    { text: "gelecek zaman", level: "B1" },
                ]
            },
        ];
        setAlternatives(alternatives);
        handleGenerateText();
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
                    <label htmlFor="wordCount" className="text-sm font-semibold text-[#1e1e1e] text-left">Yaklaşık Kelime Sayısı</label>
                    <input
                        type="number"
                        id="wordCount"
                        name="wordCount"
                        placeholder="100"
                        value={formData.wordCount}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500"
                        min="1"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="theme" className="text-sm font-semibold text-[#1e1e1e] text-left">Tema</label>
                    <input
                        type="text"
                        id="theme"
                        name="theme"
                        placeholder="bilim"
                        value={formData.theme}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500"
                    />
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
                <TagInput
                    label="Hedef Kelimeler"
                    placeholder="zürafa, kendi"
                    value={formData.targetWords}
                    onChange={(tag) => handleAddTag(tag, "targetWords")}
                />
                <TagInput
                    label="Hedef Gramer Yapıları"
                    placeholder="Geçmiş zaman, sıfat fiil"
                    value={formData.targetGrammar}
                    onChange={(tag) => handleAddTag(tag, "targetGrammar")}
                />

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
                            "Metin Üret"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
