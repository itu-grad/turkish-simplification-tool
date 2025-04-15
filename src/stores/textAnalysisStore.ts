import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TextAnalysisFormData = {
    content: string;
};

export type TextAnalysisResponse = {
    contentLevel: string;
    sentenceLevels: string[];
    grammarLevels: { text: string, level: string }[];
};

type Store = {
    formData: TextAnalysisFormData;
    setFormData: (data: TextAnalysisFormData) => void;
    resetFormData: () => void;
    response: TextAnalysisResponse;
    setResponse: (data: TextAnalysisResponse) => void;
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
                        grammarLevels: []
                    },
                }),
            response: {
                contentLevel: "",
                sentenceLevels: [],
                grammarLevels: []
            },
            setResponse: (res: TextAnalysisResponse) => set({ response: res }),
        }),
        {
            name: "text-analysis-form",
        }
    )
);