interface Props {
    isLoading: boolean;
    handleAnalyzeText: () => void;
}

export default function TextInput({ isLoading, handleAnalyzeText }: Props) {
    return (
        <div className="w-full min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-[900px] bg-[#f5f5f5] p-6 rounded-lg shadow-md">
                <div className="flex flex-col space-y-2">
                <textarea
                    id="content"
                    className="p-2 border border-gray-300 rounded-md h-40 bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500"
                    placeholder="Metin giriniz..."
                />
                </div>


                <div className="flex justify-end mt-4">
                    <button
                        className="p-3 bg-gray-500 text-white rounded-md transition-all duration-300 
                                hover:scale-105 hover:bg-gray-600 active:scale-95 cursor-pointer"
                        onClick={handleAnalyzeText}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            "Analiz Et"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
