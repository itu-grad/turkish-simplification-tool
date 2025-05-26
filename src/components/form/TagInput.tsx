import { useState } from "react";

interface TagInputProps {
    label: string;
    placeholder: string;
    value: string[];
    onChange: (tags: string[]) => void;
}

export const TagInput: React.FC<TagInputProps> = ({ label, placeholder, value, onChange }) => {
    const [inputValue, setInputValue] = useState("");
    const [showHint, setShowHint] = useState(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addTag(inputValue.trim());
        }
    };

    const addTag = (tag: string) => {
        if (tag && !value.includes(tag)) {
            const updatedTags = [...value, tag];
            onChange(updatedTags);
            setInputValue("");
            setShowHint(false);
        }
    };

    const removeTag = (tagToRemove: string) => {
        const updatedTags = value.filter((tag) => tag !== tagToRemove);
        onChange(updatedTags);
    };

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor="tagInput" className="text-sm font-semibold text-header text-left">
                {label}
            </label>
            <div className="relative">
                <div className="flex flex-wrap gap-2 p-2 border border-input-border rounded-md bg-secondary-bg">
                    {value.map((tag, index) => (
                        <div
                            key={index}
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
                    <input
                        type="text"
                        id="tagInput"
                        name="tagInput"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        className="flex-1 bg-transparent outline-none text-header"
                        placeholder={value.length === 0 ? placeholder : ""}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setShowHint(true);
                        }}
                        onFocus={() => setShowHint(true)}
                        onBlur={() => setTimeout(() => setShowHint(false), 100)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                {showHint && inputValue && (
                    <div
                        style={{ backgroundColor: "#f3f4f6", color: "#374151" }}
                        className="absolute left-0 mt-1 w-max text-sm px-4 py-2 rounded-md shadow-md z-50 font-medium"
                    >
                        👉 <span className="font-bold">Enter</span> tuşuna basın
                    </div>
                )}
            </div>
        </div>
    );
};
