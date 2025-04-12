import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LevelAdaptationFormData = {
    level: string;
    content: string;
};

type Alternative = {
    text: string;
};

type Store = {
    formData: LevelAdaptationFormData;
    setFormData: (data: LevelAdaptationFormData) => void;
    resetFormData: () => void;
    alternatives: Alternative[];
    setAlternatives: (alts: Alternative[]) => void;
};

export const useLevelAdaptationFormStore = create<Store>()(
    persist(
        (set) => ({
            formData: {
                level: "a1",
                content: "",
            },
            setFormData: (data) => set({ formData: data }),
            resetFormData: () =>
                set({
                    formData: {
                        level: "a1",
                        content: "",
                    },
                    alternatives: [],
                }),
            alternatives: [],
            setAlternatives: (alts) => set({ alternatives: alts }),
        }),
        {
            name: "level-adaptation-form",
        }
    )
);