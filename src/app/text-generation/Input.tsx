import { TagInput } from "@/components/TagInput";
import { TextGenFormData, useTextGenerationFormStore } from "@/stores/textGenerationStore";
import { useForm } from "react-hook-form";

interface Props {
    isLoading: boolean;
    handleGenerateText: () => void;
}

export default function TextGenerationInput({ isLoading, handleGenerateText }: Props) {
    const {
        formData,
        setFormData,
        setAlternatives,
    } = useTextGenerationFormStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TextGenFormData>({
        defaultValues: formData,
    });

    const handleAddTag = (tags: string[], type: "targetWords" | "targetGrammar") => {
        if (tags) {
            const updated = {
                ...formData,
                [type]: tags,
            };
            setFormData(updated);
        }
    };

    const onSubmit = (data: TextGenFormData) => {
        const fullData = {
            ...data,
            targetWords: formData.targetWords,
            targetGrammar: formData.targetGrammar,
        };
        setFormData(fullData);
        console.log("Form Data:", fullData);
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 min-w-[1200px] bg-[#f5f5f5] rounded-xl shadow-lg flex flex-col space-y-6"
        >
            <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-[#1e1e1e] text-left">Seviye</label>
                    <select
                        {...register("level", { required: "Seviye gerekli" })}
                        className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-sm text-[#1e1e1e] focus:outline-gray-500"
                    >
                        <option value="a1">A1</option>
                        <option value="a2">A2</option>
                        <option value="b1">B1</option>
                        <option value="b2">B2</option>
                        <option value="c1">C1</option>
                        <option value="c2">C2</option>
                    </select>
                    {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-[#1e1e1e] text-left">Yaklaşık Kelime Sayısı</label>
                    <input
                        type="number"
                        {...register("wordCount", {
                            required: "Kelime sayısı gerekli",
                            valueAsNumber: true,
                            min: { value: 100, message: "En az 100 olmalı" },
                        })}
                        className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500"
                    />
                    {errors.wordCount && (
                        <div className="mt-2 text-sm text-red-700 bg-red-100 p-3 border-l-4 border-red-500 rounded-md shadow-sm">
                            {errors.wordCount.message}
                        </div>
                    )}
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-[#1e1e1e] text-left">Tema</label>
                    <input
                        type="text"
                        placeholder="bilim"
                        className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500"
                    />
                </div>
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-[#1e1e1e] text-left">Metin İçeriği</label>
                <textarea
                    {...register("content", { required: "İçerik gerekli" })}
                    className="p-2 border border-gray-300 rounded-md h-40 bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500"
                />
                {errors.content && (
                    <div className="mt-2 text-sm text-red-700 bg-red-100 p-3 border-l-4 border-red-500 rounded-md shadow-sm">
                        {errors.content.message}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div className="flex flex-col space-y-2">
                    <TagInput
                        label="Hedef Kelimeler"
                        placeholder="zürafa, kendi"
                        value={formData.targetWords}
                        onChange={(tags) => handleAddTag(tags, "targetWords")}

                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <TagInput
                        label="Hedef Gramer Yapıları"
                        placeholder="geçmiş zaman, sıfat fiil"
                        value={formData.targetGrammar}
                        onChange={(tags) => handleAddTag(tags, "targetGrammar")}
                    />
                </div>

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
