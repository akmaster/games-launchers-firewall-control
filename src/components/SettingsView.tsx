import { Trash2, Languages, Settings as SettingsIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SettingsView() {
    const { strings, setLanguage, language } = useLanguage();

    const handleReset = () => {
        if (confirm(strings.settings.general.reset_confirm)) {
            localStorage.clear();
            location.reload();
        }
    };

    return (
        <div className="h-full p-8 overflow-y-auto relative">

            <div className="flex items-center gap-4 mb-8 sticky top-0 bg-background/80 backdrop-blur-md py-4 z-10 border-b border-white/5">
                <div className="p-3 bg-primary/20 rounded-xl">
                    <SettingsIcon className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">{strings.settings.title}</h1>
                </div>
            </div>

            <div className="max-w-4xl space-y-8">

                {/* Language Section */}
                <section className="bg-surface border border-white/5 rounded-2xl p-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-indigo-500/20 rounded-xl">
                            <Languages className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">{strings.settings.language.title}</h2>
                            <p className="text-gray-400 text-sm">{strings.settings.language.desc}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => setLanguage('en')}
                            className={`p-4 rounded-xl border transition-all flex items-center justify-between group ${language === 'en' ? 'bg-indigo-500/20 border-indigo-500/50' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                        >
                            <span className="text-lg font-medium text-white group-hover:text-indigo-400 transition-colors">English</span>
                            {language === 'en' && <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_var(--color-indigo-500)]"></div>}
                        </button>

                        <button
                            onClick={() => setLanguage('tr')}
                            className={`p-4 rounded-xl border transition-all flex items-center justify-between group ${language === 'tr' ? 'bg-indigo-500/20 border-indigo-500/50' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                        >
                            <span className="text-lg font-medium text-white group-hover:text-indigo-400 transition-colors">Türkçe</span>
                            {language === 'tr' && <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_var(--color-indigo-500)]"></div>}
                        </button>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-red-500/20 rounded-xl">
                            <Trash2 className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-red-100 mb-1">{strings.settings.general.reset}</h2>
                            <p className="text-red-200/60 text-sm">{strings.settings.general.reset_desc}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleReset}
                        className="px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/50 transition-all font-bold tracking-wider hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.5)] active:scale-95"
                    >
                        {strings.settings.general.reset_btn}
                    </button>
                </section>

            </div>
        </div>
    );
}
