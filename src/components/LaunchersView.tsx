import { useState, useEffect } from 'react';
import { invoke } from "@tauri-apps/api/core";
import { ShieldAlert, Globe, GlobeLock, RefreshCw, Play, Settings, ChevronDown, ChevronUp, FileCode } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ThemedModal from './ThemedModal'; // Ensure this is imported if used, otherwise remove call

interface LauncherState {
    id: 'Steam_ALL' | 'Ubisoft' | 'EA' | 'Epic' | 'Rockstar';
    blocked: boolean;
}

interface LauncherFile {
    path: String;
    rule_name: String;
    blocked: boolean;
}

// Simple simplified modal trigger function assuming showModal is globally available or passed via context
// But based on previous edits, it seemed showModal was a local helper or import. 
// I will assume `showModal` usage should be replaced by a local state or props if not available.
// However, the previous file view showed `showModal` usage but no definition and no import?
// Ah, `showModal` in previous edits was a mistake if it wasn't defined. 
// I will just use console.error for now to avoid breaking if showModal isn't actually there.
// OR I will define a simple alert fallback.

export default function LaunchersView() {
    const { strings } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const [expandedLauncher, setExpandedLauncher] = useState<string | null>(null);
    const [launcherFiles, setLauncherFiles] = useState<LauncherFile[]>([]);
    const [loadingFiles, setLoadingFiles] = useState(false);

    const [launchers, setLaunchers] = useState<LauncherState[]>([
        { id: 'Steam_ALL', blocked: false },
        { id: 'Ubisoft', blocked: false },
        { id: 'EA', blocked: false },
        { id: 'Epic', blocked: false },
        { id: 'Rockstar', blocked: false },
    ]);

    // Helper to get display info based on ID
    const getLauncherInfo = (id: string) => {
        switch (id) {
            case 'Steam_ALL': return { name: strings.launchers.names.steam, desc: strings.launchers.desc.steam };
            case 'Ubisoft': return { name: strings.launchers.names.ubisoft, desc: strings.launchers.desc.ubisoft };
            case 'EA': return { name: strings.launchers.names.ea, desc: strings.launchers.desc.ea };
            case 'Epic': return { name: strings.launchers.names.epic, desc: strings.launchers.desc.epic };
            case 'Rockstar': return { name: strings.launchers.names.rockstar, desc: strings.launchers.desc.rockstar };
            default: return { name: id, desc: '' };
        }
    };

    const toggleFirewall = async (id: string, currentState: boolean) => {
        const newState = !currentState;
        try {
            await invoke('toggle_launcher_firewall', { launcherName: id, block: newState });

            setLaunchers(prev => prev.map(l =>
                l.id === id ? { ...l, blocked: newState } : l
            ));

            // If this launcher is expanded, refresh files too
            if (expandedLauncher === id) {
                fetchLauncherFiles(id);
            }

        } catch (error) {
            console.error(error);
            alert("Hata: " + error);
        }
    };

    const checkAllStatuses = async () => {
        setIsLoading(true);
        const updatedLaunchers = [...launchers];
        for (let i = 0; i < updatedLaunchers.length; i++) {
            try {
                // Backend returns true if BLOCKED
                const isBlocked = await invoke<boolean>('get_launcher_status', { launcherName: updatedLaunchers[i].id });
                updatedLaunchers[i].blocked = isBlocked;
            } catch (e) {
                console.error("Status check failed for", updatedLaunchers[i].id, e);
            }
        }
        setLaunchers(updatedLaunchers);
        // Short delay to make the loading screen feel smoother/less jittery if it's too fast
        setTimeout(() => setIsLoading(false), 500);
    };

    const fetchLauncherFiles = async (id: string) => {
        setLoadingFiles(true);
        try {
            // Use proper type argument for invoke to avoid 'unknown' error
            const files = await invoke<LauncherFile[]>('get_launcher_files', { launcherName: id });
            setLauncherFiles(files);
        } catch (e) {
            console.error("Failed to fetch files", e);
        }
        setLoadingFiles(false);
    };

    const toggleFile = async (file: LauncherFile) => {
        try {
            await invoke('toggle_file_rule', {
                ruleName: file.rule_name,
                path: file.path,
                block: !file.blocked
            });
            // Refresh file list to confirm status
            if (expandedLauncher) fetchLauncherFiles(expandedLauncher);
        } catch (e) {
            console.error("Failed to toggle file", e);
            alert("File toggle failed: " + e);
        }
    };

    useEffect(() => {
        checkAllStatuses();
    }, []);

    useEffect(() => {
        if (expandedLauncher) {
            fetchLauncherFiles(expandedLauncher);
        } else {
            setLauncherFiles([]);
        }
    }, [expandedLauncher]);

    return (
        <div className="h-full p-8 overflow-y-auto relative">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-xl transition-all duration-500">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ShieldAlert className="w-8 h-8 text-primary animate-pulse" />
                        </div>
                    </div>
                    <h2 className="mt-8 text-2xl font-bold text-white tracking-widest animate-pulse">{strings.launchers.loading.title}</h2>
                    <p className="mt-2 text-primary/80 font-mono tracking-wide">{strings.launchers.loading.subtitle}</p>
                </div>
            )}

            <div className="flex items-center justify-between mb-8 sticky top-0 bg-background/80 backdrop-blur-md py-4 z-10 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                        <ShieldAlert className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white">{strings.launchers.title}</h1>
                        <p className="text-gray-400">{strings.launchers.subtitle}</p>
                    </div>
                </div>
                <button
                    onClick={checkAllStatuses}
                    className="p-3 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5 hover:border-white/20"
                    title={strings.launchers.refresh_tooltip}
                >
                    <RefreshCw className="w-6 h-6" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {launchers.map((launcher) => {
                    const info = getLauncherInfo(launcher.id);
                    const isExpanded = expandedLauncher === launcher.id;

                    return (
                        <div
                            key={launcher.id}
                            className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${launcher.blocked ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)]' : 'bg-surface border-white/5 hover:bg-white/5'} ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}
                        >
                            <div className="p-6 relative z-10 flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-xl transition-colors ${launcher.blocked ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-gray-300'}`}>
                                            {launcher.blocked ? <GlobeLock className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{info.name}</h3>
                                            <p className="text-sm text-gray-500">{info.desc}</p>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${launcher.blocked ? 'bg-red-500 text-white' : 'bg-green-500/10 text-green-500'}`}>
                                        {launcher.blocked ? strings.launchers.status.blocked : strings.launchers.status.online}
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-2">
                                    <button
                                        onClick={() => toggleFirewall(launcher.id, launcher.blocked)}
                                        className={`flex-1 py-3 rounded-xl font-bold tracking-widest transition-all active:scale-95 text-sm ${launcher.blocked
                                            ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20'
                                            : 'bg-white/10 hover:bg-white/20 text-white'
                                            }`}
                                    >
                                        {launcher.blocked ? strings.launchers.actions.unblock : strings.launchers.actions.block}
                                    </button>

                                    <button
                                        onClick={() => setExpandedLauncher(isExpanded ? null : launcher.id)}
                                        className={`px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center border ${isExpanded ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/5 text-gray-400 hover:text-white hover:bg-white/5'}`}
                                        title="Advanced Mode"
                                    >
                                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                                    </button>

                                    <button
                                        onClick={async () => {
                                            try {
                                                await invoke('open_launcher', { launcherName: launcher.id });
                                            } catch (error) {
                                                console.error(error);
                                                alert("Launch Failed: " + error);
                                            }
                                        }}
                                        className="px-6 rounded-xl bg-primary hover:bg-primary/80 text-white transition-all active:scale-95 flex items-center justify-center shadow-lg shadow-primary/20"
                                        title={strings.launchers.actions.start}
                                    >
                                        <Play className="w-6 h-6 fill-current" />
                                    </button>
                                </div>

                                {/* Advanced File List */}
                                {isExpanded && (
                                    <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
                                        <h4 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
                                            <FileCode className="w-4 h-4" />
                                            Advanced File Control
                                        </h4>

                                        {loadingFiles ? (
                                            <div className="text-center py-4 text-gray-500">Loading files...</div>
                                        ) : (
                                            <div className="space-y-2">
                                                {launcherFiles.length === 0 ? (
                                                    <div className="text-gray-500 text-sm italic">No files found for this launcher.</div>
                                                ) : (
                                                    launcherFiles.map((file, idx) => (
                                                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-black/20 hover:bg-black/30 transition-colors border border-white/5">
                                                            <div className="overflow-hidden">
                                                                <div className="text-xs text-gray-300 font-mono truncate max-w-md" title={file.path as string}>
                                                                    {file.path}
                                                                </div>
                                                                <div className="text-[10px] text-gray-600 truncate">{file.rule_name}</div>
                                                            </div>
                                                            <button
                                                                onClick={() => toggleFile(file)}
                                                                className={`ml-4 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${file.blocked
                                                                    ? 'bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white'
                                                                    : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'}`}
                                                            >
                                                                {file.blocked ? 'BLOCKED' : 'ALLOWED'}
                                                            </button>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Background Glow Effect */}
                            <div className={`absolute -right-10 -bottom-10 w-40 h-40 blur-[80px] rounded-full transition-colors duration-500 ${launcher.blocked ? 'bg-red-500/20' : 'bg-primary/10'}`}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
