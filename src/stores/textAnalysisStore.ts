import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TextAnalysisFormData = {
    content: string;
};

type Response = {
    contentLevel: string;
    sentenceLevels: string[];
};

type Store = {
    formData: TextAnalysisFormData;
    setFormData: (data: TextAnalysisFormData) => void;
    resetFormData: () => void;
    response: Response;
    setResponse: (data: Response) => void;
};

export const useTextAnalysisFormStore = create<Store>()(
    persist(
        (set) => ({
            formData: {
                content: "",
            },
            setFormData: (data) => set({ formData: data }),
            resetFormData: () =>
                set({
                    formData: {
                        content: "",
                    },
                    response: {
                        contentLevel: "",
                        sentenceLevels: [],
                    },
                }),
            response: {
                contentLevel: "",
                sentenceLevels: [],
            },
            setResponse: (res: Response) => set({ response: res }),
        }),
        {
            name: "text-analysis-form",
        }
    )
);