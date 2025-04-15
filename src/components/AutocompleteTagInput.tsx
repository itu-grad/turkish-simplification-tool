'use client';

import { useState, useEffect, useRef } from 'react';

interface AutocompleteTagInputProps {
    label: string;
    placeholder: string;
    value: string[];
    onChange: (tags: string[]) => void;
    topics: string[];
}

export const AutocompleteTagInput: React.FC<AutocompleteTagInputProps> = ({
    label,
    placeholder,
    value,
    onChange,
    topics,
}) => {
    const [input, setInput] = useState('');
    const [filtered, setFiltered] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (input.trim() === '') {
            setFiltered([]);
            setShowSuggestions(false);
            return;
        }

        const suggestions = topics
            .filter(
                (t) =>
                    t.toLowerCase().includes(input.toLowerCase()) &&
                    !value.includes(t)
            );

        const uniqueSuggestions = Array.from(new Set(suggestions)).slice(0, 10);

        setFiltered(uniqueSuggestions);
        setShowSuggestions(uniqueSuggestions.length > 0);
        setHighlightIndex(0);
    }, [input, value, topics]);

    const addTag = (tag: string) => {
        if (tag && !value.includes(tag)) {
            onChange([...value, tag]);
        }
        setInput('');
        setShowSuggestions(false);
        setHighlightIndex(0);
    };

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter((tag) => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (showSuggestions && filtered[highlightIndex]) {
                addTag(filtered[highlightIndex]);
            } else {
                const exact = topics.find(
                    (t) => t.toLowerCase() === input.trim().toLowerCase()
                );
                if (exact) addTag(exact);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <label
                htmlFor="autocompleteTagInput"
                className="text-sm font-semibold text-header text-left"
            >
                {label}
            </label>

            <div className="flex flex-wrap gap-2 p-2 border border-input-border rounded-md bg-secondary-bg">
                {value.map((tag) => (
                    <div
                        key={tag}
                        className="flex items-center bg-gray-200 text-paragraph px-2 py-1 rounded-md"
                    >
                        <span>{tag}</span>
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-error-br hover:text-error-txt"
                        >
                            ✕
                        </button>
                    </div>
                ))}

                <div className="relative w-full">
                    <input
                        id="autocompleteTagInput"
                        ref={inputRef}
                        type="text"
                        value={input}
                        placeholder={value.length === 0 ? placeholder : ''}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent outline-none text-header"
                    />

                    {showSuggestions && (
                        <ul className="absolute z-10 w-full border bg-primary-bg rounded mt-1 max-h-48 overflow-auto shadow">
                            {filtered.map((suggestion, i) => (
                                <li
                                    key={`${suggestion}-${i}`}
                                    onClick={() => addTag(suggestion)}
                                    className={`px-4 py-2 cursor-pointer ${i === highlightIndex
                                        ? 'bg-button-hover-bg text-secondary-bg'
                                        : 'hover:bg-button-bg hover:text-secondary-bg text-paragraph'
                                        }`}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
