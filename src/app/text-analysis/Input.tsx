import { ErrorMessage } from "@/components/form/ErrorMessage";
import SubmitButton from "@/components/form/SubmitButton";
import { TextAnalysisFormData, useTextAnalysisFormStore } from "@/stores/textAnalysisStore";
import { useRef } from "react";
import { useForm } from "react-hook-form";

interface Props {
    isLoading: boolean;
    handleAnalyzeText: () => void;
}

export default function TextInput({ isLoading, handleAnalyzeText }: Props) {
    const { setFormData, setResponse, formData } =
        useTextAnalysisFormStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<TextAnalysisFormData>({
        defaultValues: formData,
    });

    const previousExampleIndex = useRef<number | null>(null);

    const onSubmit = async (data: TextAnalysisFormData) => {
        setFormData(data);
        console.log('Form Data:', data);

        try {
            setResponse({ sentenceLevels: [], contentLevel: "" })
            fetch("/api/analysis", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: data.content }),
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log("response", result);
                    setResponse(result);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });

            handleAnalyzeText();
        } catch (error) {
            console.error("Error fetching analysis response:", error);
        }
    };

    const onGenerateExample = async () => {
        const response = await fetch(`/api/analysis/generate-example?prev=${previousExampleIndex.current ?? -1}`, {
            method: "GET",
        });
        const data = await response.json();
        setValue("content", data.content);
        setFormData({ content: data.content });
        previousExampleIndex.current = data.index;
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 min-w-[1200px] rounded-xl flex flex-col space-y-6 min-h-screen"
        >
            <div className="w-full min-w-[400px] flex items-center justify-center p-4 flex-grow">
                <div className="w-full max-w-[1200px] bg-primary-bg p-6 rounded-lg shadow-md flex flex-col min-h-[60vh]">
                    <div className="flex flex-col space-y-2 flex-grow">
                        <label className="text-sm font-semibold text-header text-left">Metin İçeriği</label>
                        <textarea
                            id="content"
                            {...register("content", {
                                required: "Metin içeriği gerekli",
                                minLength: {
                                    value: 10,
                                    message: "En az 10 karakter girmelisiniz",
                                },
                            })}
                            className="p-2 border border-input-border rounded-md bg-secondary-bg text-header focus:outline-gray-500 flex-grow"
                            placeholder={`Metin giriniz...\n\nÖrnek metinler için "Örnek Metin Ver" butonunu kullanabilirsiniz.`}
                        />
                        <ErrorMessage message={errors.content?.message} />
                    </div>
                    <div className="flex justify-between mt-4 space-x-4">
                        <SubmitButton
                            isLoading={false}
                            text="Örnek Metin Ver"
                            type="button"
                            onClick={onGenerateExample}
                        />
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
