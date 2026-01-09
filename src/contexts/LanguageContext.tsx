import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from '../locales/en';
import { tr } from '../locales/tr';

// Define the shape of our resources
type LocaleType = typeof en;

// Dictionary of available languages
const resources = {
    en: en,
    tr: tr
};

type LanguageCode = keyof typeof resources;

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    strings: LocaleType;
    isLanguageSelected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Default to 'en' if nothing in storage, but we track if user explicitly selected
    const [language, setLanguageState] = useState<LanguageCode>('en');
    const [isLanguageSelected, setIsLanguageSelected] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('app_language') as LanguageCode;
        if (savedLang && resources[savedLang]) {
            setLanguageState(savedLang);
            setIsLanguageSelected(true);
        } else {
            // First time logic
            setIsLanguageSelected(false);
        }
    }, []);

    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang);
        setIsLanguageSelected(true);
        localStorage.setItem('app_language', lang);
    };

    const value = {
        language,
        setLanguage,
        strings: resources[language],
        isLanguageSelected
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
