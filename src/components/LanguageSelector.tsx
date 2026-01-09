import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSelector() {
    const { setLanguage } = useLanguage();

    return (
        <div className="h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden relative">

            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <div className="relative z-10 text-center mb-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6 border border-white/10 shadow-lg shadow-primary/20 backdrop-blur-sm">
                    <Globe className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-widest mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    WELCOME / HOŞGELDİNİZ
                </h1>
                <p className="text-gray-400 text-lg font-light tracking-wide">
                    Choose your language to continue <br />
                    <span className="text-gray-500 text-sm">(Devam etmek için dil seçin)</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-8 relative z-10">
                {/* English Card */}
                <button
                    onClick={() => setLanguage('en')}
                    className="group relative h-48 rounded-3xl border border-white/5 bg-surface/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_50px_-10px_var(--color-primary)] active:scale-95 text-left p-8"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <span className="text-4xl">🇺🇸</span>
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-primary/20 text-primary">
                                <Check className="w-4 h-4" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">English</h3>
                            <p className="text-gray-500 text-sm">International</p>
                        </div>
                    </div>
                </button>

                {/* Turkish Card */}
                <button
                    onClick={() => setLanguage('tr')}
                    className="group relative h-48 rounded-3xl border border-white/5 bg-surface/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:shadow-[0_0_50px_-10px_rgba(239,68,68,0.5)] active:scale-95 text-left p-8"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <span className="text-4xl">🇹🇷</span>
                            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-red-500/20 text-red-500">
                                <Check className="w-4 h-4" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">Türkçe</h3>
                            <p className="text-gray-500 text-sm">Türkiye</p>
                        </div>
                    </div>
                </button>
            </div>

            <div className="mt-16 text-xs text-gray-600 font-mono">
                GAMER HUB // NEXUS LAUNCHER
            </div>
        </div>
    );
}
