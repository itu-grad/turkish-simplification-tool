export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white text-center py-6">
            <p>ITU NLP</p>
            <div className="flex justify-center space-x-4 mt-2">
                <a href="#"><img src="/icons/facebook.svg" alt="Facebook" width={20} /></a>
                <a href="#"><img src="/icons/instagram.svg" alt="Instagram" width={20} /></a>
                <a href="#"><img src="/icons/linkedin.svg" alt="LinkedIn" width={20} /></a>
            </div>
        </footer>
    );
}
