import { ErrorMessage } from "@/components/ErrorMessage";
import SubmitButton from "@/components/SubmitButton";
import { TextAnalysisFormData, useTextAnalysisFormStore } from "@/stores/textAnalysisStore";
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
    } = useForm<TextAnalysisFormData>({
        defaultValues: formData,
    });

    const onSubmit = (data: TextAnalysisFormData) => {
        setFormData(data);
        console.log("Form Data:", formData);
        const response = {
            contentLevel: "B1",
            sentenceLevels: [  // starting from index 0
                "A1",
                "B1",
                "C1",
            ]
        };
        setResponse(response);
        handleAnalyzeText();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 min-w-[1200px] rounded-xl flex flex-col space-y-6 min-h-screen"
        >
            <div className="w-full min-w-[400px] flex items-center justify-center p-4 flex-grow">
                <div className="w-full max-w-[1200px] bg-primary-bg p-6 rounded-lg shadow-md flex flex-col min-h-[60vh]">
                    <div className="flex flex-col space-y-2 flex-grow">
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
                            placeholder="Metin giriniz..."
                        />
                        <ErrorMessage message={errors.content?.message} />
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
