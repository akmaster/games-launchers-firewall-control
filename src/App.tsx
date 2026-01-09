import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import LaunchersView from "./components/LaunchersView";
import SettingsView from "./components/SettingsView";
import NotesView from "./components/NotesView";
import { useLanguage } from "./contexts/LanguageContext";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState<'launchers' | 'notes' | 'settings'>('launchers');
  const { strings, isLanguageSelected } = useLanguage();

  useEffect(() => {
    const initApp = async () => {
      // Simulate checking for updates or initializing services
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Close splash and show main window
      await invoke("close_splash");

      // Trigger fade-in animation
      setIsLoaded(true);
    };

    initApp();
  }, []);

  // If language is not selected yet, show the selection screen
  if (!isLanguageSelected) {
    return (
      <div className={`h-screen w-full bg-background transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <LanguageSelector />
      </div>
    );
  }

  return (
    <div className={`h-screen w-full bg-background text-gray-100 flex flex-col font-sans select-none overflow-hidden transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

      {/* Custom Title Bar Area (Placeholder for now) */}
      <div className="h-8 bg-surface/50 w-full flex items-center px-4 border-b border-white/5 drag-region" data-tauri-drag-region>
        <span className="text-xs font-display tracking-widest text-gray-500">{strings.app.title}</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-20 lg:w-64 bg-surface/30 backdrop-blur-md border-r border-white/5 flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-to shadow-lg shadow-primary/20"></div>
            <span className="font-display font-bold text-xl tracking-wide hidden lg:block">{strings.app.logo}</span>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">

            <button
              onClick={() => setCurrentView('launchers')}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${currentView === 'launchers' ? 'bg-white/5 text-white shadow-inner border border-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <div className={`w-2 h-2 rounded-full ${currentView === 'launchers' ? 'bg-red-500' : 'bg-gray-600'}`}></div>
              <span className="hidden lg:block">{strings.app.sidebar.launchers}</span>
            </button>

            <button
              onClick={() => setCurrentView('notes')}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${currentView === 'notes' ? 'bg-white/5 text-white shadow-inner border border-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <div className={`w-2 h-2 rounded-full ${currentView === 'notes' ? 'bg-indigo-500' : 'bg-gray-600'}`}></div>
              <span className="hidden lg:block">{strings.app.sidebar.notes}</span>
            </button>

            <div className="pt-4 border-t border-white/5 mt-4">
              <button
                onClick={() => setCurrentView('settings')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${currentView === 'settings' ? 'bg-white/5 text-white shadow-inner border border-white/5' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
                <span className="hidden lg:block">{strings.app.sidebar.settings}</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gradient-to-br from-background via-background to-surface/20 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

          {currentView === 'launchers' && <LaunchersView />}
          {currentView === 'notes' && <NotesView />}
          {currentView === 'settings' && <SettingsView />}
        </main>
      </div>

    </div>
  );
}

export default App;
