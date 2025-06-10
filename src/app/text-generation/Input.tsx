import { AutocompleteTagInput } from "@/components/form/AutocompleteTagInput";
import { ErrorMessage } from "@/components/form/ErrorMessage";
import SubmitButton from "@/components/form/SubmitButton";
import { TagInput } from "@/components/form/TagInput";
import { TextGenFormData, useTextGenerationFormStore } from "@/stores/textGenerationStore";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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

    const [topics, setTopics] = useState<string[]>([]);
    useEffect(() => {
        fetch('/api/topics')
            .then((res) => res.json())
            .then((data) => {
                setTopics(data.topics.map((t: string) => t.toLowerCase()));
            })
    }, []);

    const handleAddTag = (tags: string[], type: "targetWords" | "targetGrammar") => {
        if (tags) {
            const updated = {
                ...formData,
                [type]: tags,
            };
            setFormData(updated);
        }
    };

    const onSubmit = async (data: TextGenFormData) => {
        const fullData = {
            ...data,
            targetWords: formData.targetWords,
            targetGrammar: formData.targetGrammar,
        };
        setFormData(fullData);
        console.log("Form Data:", fullData);
        setAlternatives([]);
        fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    content: fullData.content,
                    level: fullData.level,
                    targetGrammar: fullData.targetGrammar,
                    targetWords: fullData.targetWords,
                    theme: fullData.theme,
                    wordCount: fullData.wordCount,
                }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("response", result);
                setAlternatives(result.alternatives ?? []);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        handleGenerateText();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 min-w-[1200px] bg-primary-bg rounded-xl shadow-lg flex flex-col space-y-6"
        >
            <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-header text-left">Seviye</label>
                    <select
                        {...register("level", { required: "Seviye gerekli" })}
                        className="p-2 border border-input-border rounded-md bg-secondary-bg text-sm text-header focus:outline-gray-500"
                    >
                        <option value="a1">A1</option>
                        <option value="a2">A2</option>
                        <option value="b1">B1</option>
                        <option value="b2">B2</option>
                        <option value="c1">C1</option>
                        <option value="c2">C2</option>
                    </select>
                    <ErrorMessage message={errors.level?.message} />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-header text-left">Yaklaşık Kelime Sayısı</label>
                    <input
                        type="number"
                        {...register("wordCount", {
                            required: "Kelime sayısı gerekli",
                            valueAsNumber: true,
                            min: { value: 100, message: "En az 100 olmalı" },
                        })}
                        className="p-2 border border-input-border rounded-md bg-secondary-bg text-header focus:outline-gray-500"
                    />
                    <ErrorMessage message={errors.wordCount?.message} />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-header text-left">Tema</label>
                    <input
                        {...register("theme")}
                        type="text"
                        placeholder="Ör: bilim"
                        className="p-2 border border-input-border rounded-md bg-secondary-bg text-header focus:outline-gray-500"
                    />
                </div>
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-header text-left">Metin İçeriği</label>
                <textarea
                    id="content"
                    placeholder="Üretilecek metin için istediğiniz içeriği buraya yazınız..."
                    {...register("content", {
                        required: "Metin içeriği gerekli",
                        minLength: {
                            value: 10,
                            message: "En az 10 karakter girmelisiniz",
                        },
                    })}
                    className="p-2 border border-input-border rounded-md h-40 bg-secondary-bg text-header focus:outline-gray-500"
                />
                <ErrorMessage message={errors.content?.message} />
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div className="flex flex-col space-y-2">
                    <TagInput
                        label="Hedef Kelimeler"
                        placeholder="Ör: zürafa"
                        value={formData.targetWords}
                        onChange={(tags) => handleAddTag(tags, "targetWords")}

                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <AutocompleteTagInput
                        label="Hedef Dil Bilgisi Yapıları"
                        placeholder="Ör: geçmiş zaman"
                        value={formData.targetGrammar}
                        onChange={(tags) => handleAddTag(tags, "targetGrammar")}
                        topics={topics}
                    />
                </div>

                <div></div>

                <div className="flex flex-col space-y-2">
                    <SubmitButton
                        isLoading={isLoading}
                        text="Metin Üret"
                        type="submit"
                    />
                </div>
            </div>
        </form>
    );
}
