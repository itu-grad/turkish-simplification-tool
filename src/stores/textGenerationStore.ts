import { create } from "zustand";
import { persist } from "zustand/middleware";

type TextGenFormData = {
    level: string;
    wordCount: string;
    theme: string;
    content: string;
    targetWords: string[];
    targetGrammar: string[];
};

type Alternative = {
    text: string;
    words: { text: string; level: string }[];
    grammar: { text: string; level: string }[];
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
                wordCount: "",
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
                        wordCount: "",
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