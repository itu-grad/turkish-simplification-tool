interface Props {
    isLoading: boolean;
    handleGenerateText: () => void;
}

export default function TextGenerationInput({ isLoading, handleGenerateText }: Props) {
    return (
        <div className="p-8 min-w-[1200] bg-[#f5f5f5] rounded-xl shadow-lg flex flex-col space-y-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="level" className="text-sm font-semibold text-[#1e1e1e] text-left">Seviye</label>
                    <select id="level" className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-sm text-[#1e1e1e] focus:outline-gray-500">
                        <option value="a1">A1</option>
                        <option value="a2">A2</option>
                        <option value="b1">B1</option>
                        <option value="b2">B2</option>
                        <option value="c1">C1</option>
                        <option value="c2">C2</option>
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="number" className="text-sm font-semibold text-[#1e1e1e] text-left">Yaklaşık Kelime Sayısı</label>
                    <input type="number" id="number" className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500" placeholder="100" />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="theme" className="text-sm font-semibold text-[#1e1e1e] text-left">Tema</label>
                    <input type="text" id="theme" className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500" placeholder="Bilim" />
                </div>
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="content" className="text-sm font-semibold text-[#1e1e1e] text-left">Metin İçeriği</label>
                <textarea id="content" className="p-2 border border-gray-300 rounded-md h-40 bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500" placeholder="Metnin içeriğini giriniz..." />
            </div>

            <div className="grid grid-cols-4 gap-6">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="targetWords" className="text-sm font-semibold text-[#1e1e1e] text-left">Hedef Kelimeler</label>
                    <input type="text" id="targetWords" className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500" placeholder="zürafa, kendi" />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="targetGrammar" className="text-sm font-semibold text-[#1e1e1e] text-left">Hedef Gramer Yapıları</label>
                    <input type="text" id="targetGrammar" className="p-2 border border-gray-300 rounded-md bg-[#fafafa] text-[#1e1e1e] focus:outline-gray-500" placeholder="Geçmiş zaman, sıfat fiil" />
                </div>

                <div></div>

                <div className="flex flex-col space-y-2">
                    <button
                        className="mt-6 p-3 bg-gray-500 text-white rounded-md transition-all duration-300 
                                            hover:scale-105 hover:bg-gray-600 active:scale-95 cursor-pointer"
                        onClick={handleGenerateText}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            "Metin Üret"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
