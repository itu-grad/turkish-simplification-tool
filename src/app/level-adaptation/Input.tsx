import { ErrorMessage } from "@/components/form/ErrorMessage";
import SubmitButton from "@/components/form/SubmitButton";
import {
    LevelAdaptationFormData,
    useLevelAdaptationFormStore,
} from "@/stores/levelAdaptationStore";
import { useForm } from "react-hook-form";

interface Props {
    isLoading: boolean;
    handleGenerateText: () => void;
}

export default function LevelAdaptationInput({
    isLoading,
    handleGenerateText,
}: Props) {
    const { setFormData, setAlternatives, formData } =
        useLevelAdaptationFormStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LevelAdaptationFormData>({
        defaultValues: formData,
    });

    const onSubmit = async (data: LevelAdaptationFormData) => {
        setFormData(data);
        console.log("Form Data:", data);
        setAlternatives([]);

        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: data.content,
                level: data.level,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("response", result.alternatives);
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
                    <label
                        htmlFor="level"
                        className="text-sm font-semibold text-header text-left"
                    >
                        Hedef Seviye
                    </label>
                    <select
                        id="level"
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
            </div>

            <div className="flex flex-col space-y-2">
                <label
                    htmlFor="content"
                    className="text-sm font-semibold text-header text-left"
                >
                    Metin İçeriği
                </label>
                <textarea
                    id="content"
                    placeholder="Metin giriniz..."
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

            <div className="flex justify-end mt-4">
                <SubmitButton isLoading={isLoading} text="Uyarla" type="submit" />
            </div>
        </form>
    );
}
