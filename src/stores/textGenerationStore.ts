import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TextGenFormData = {
    level: string;
    wordCount: number;
    theme: string;
    content: string;
    targetWords: string[];
    targetGrammar: string[];
};

type Alternative = {
    text: string;
};

type Store = {
    formData: TextGenFormData;
    setFormData: (data: TextGenFormData) => void;
    resetFormData: () => void;
    alternatives: Alternative[];
    setAlternatives: (alts: Alternative[]) => void;
};

export const useTextGenerationFormStore = create<Store>()(
    persist(
        (set) => ({
            formData: {
                level: "a1",
                wordCount: 100,
                theme: "",
                content: "",
                targetWords: [],
                targetGrammar: [],
            },
            setFormData: (data) => set({ formData: data }),
            resetFormData: () =>
                set({
                    formData: {
                        level: "a1",
                        wordCount: 100,
                        theme: "",
                        content: "",
                        targetWords: [],
                        targetGrammar: [],
                    },
                    alternatives: [],
                }),
            alternatives: [],
            setAlternatives: (alts) => set({ alternatives: alts }),
        }),
        {
            name: "text-generation-form",
        }
    )
);