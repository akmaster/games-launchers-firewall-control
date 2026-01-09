import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';
import { ShieldAlert, CheckCircle, AlertCircle, XCircle, Settings as SettingsIcon } from 'lucide-react';

interface DetectedLauncher {
    id: string;
    name: string;
    path: string | null;
    status: 'Found' | 'NotFound' | 'UserSkipped';
}

interface SetupWizardProps {
    onComplete: () => void;
}

export default function SetupWizard({ onComplete }: SetupWizardProps) {
    const [scanning, setScanning] = useState(true);
    const [launchers, setLaunchers] = useState<DetectedLauncher[]>([]);
    const [showSkipWarning, setShowSkipWarning] = useState(false);

    useEffect(() => {
        scanLaunchers();
    }, []);

    const scanLaunchers = async () => {
        setScanning(true);
        try {
            const detected = await invoke<DetectedLauncher[]>('auto_detect_launchers');
            setLaunchers(detected);

            // Auto-complete wizard if all launchers found
            const allFound = detected.every(l => l.status === 'Found');
            if (allFound) {
                setTimeout(async () => {
                    await invoke('complete_setup_wizard');
                    onComplete();
                }, 3000); // 3 second delay to show success
            } else {
                setScanning(false);
            }
        } catch (error) {
            console.error('Failed to scan launchers:', error);
            setScanning(false);
        }
    };

    const selectManualPath = async (id: string) => {
        try {
            const selected = await open({
                multiple: false,
                filters: [{
                    name: 'Executables',
                    extensions: ['exe']
                }],
                title: `${id} launcher dosyasını seçin`
            });

            if (selected) {
                await invoke('save_custom_launcher_path', {
                    launcherId: id,
                    path: selected
                });
                // Refresh scan
                await scanLaunchers();
            }
        } catch (error) {
            console.error('Failed to select path:', error);
        }
    };

    const skipLauncher = async (id: string) => {
        try {
            await invoke('skip_launcher', { launcherId: id });
            // Update local state
            setLaunchers(prev => prev.map(l =>
                l.id === id ? { ...l, status: 'UserSkipped' as const } : l
            ));
        } catch (error) {
            console.error('Failed to skip launcher:', error);
        }
    };

    const handleSkipWizard = () => {
        setShowSkipWarning(true);
    };

    const confirmSkip = async () => {
        try {
            await invoke('complete_setup_wizard');
            onComplete();
        } catch (error) {
            console.error('Failed to complete wizard:', error);
        }
    };

    const handleComplete = async () => {
        try {
            await invoke('complete_setup_wizard');
            onComplete();
        } catch (error) {
            console.error('Failed to complete wizard:', error);
        }
    };

    const allResolved = launchers.every(l => l.status !== 'NotFound');
    const allFound = launchers.every(l => l.status === 'Found');

    // Scanning Phase
    if (scanning) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                <div className="relative">
                    <div className="w-24 h-24 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ShieldAlert className="w-10 h-10 text-primary animate-pulse" />
                    </div>
                </div>

                <h2 className="mt-8 text-3xl font-bold text-white tracking-wide">
                    {allFound ? '✅ Tüm launcher\'lar bulundu!' : '🔍 Launcher\'lar taranıyor...'}
                </h2>
                <p className="mt-2 text-gray-400 text-center max-w-md">
                    {allFound
                        ? '3 saniye içinde otomatik olarak ana ekrana yönlendirileceksiniz'
                        : 'Steam, Epic Games, Ubisoft, EA ve Rockstar launcher\'ları aranıyor'
                    }
                </p>

                {allFound && (
                    <div className="mt-6 flex gap-2">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="w-3 h-3 bg-primary rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            ></div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Skip Warning Modal
    if (showSkipWarning) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-8">
                <div className="max-w-md w-full bg-surface border border-yellow-500/30 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertCircle className="w-12 h-12 text-yellow-500" />
                        <h2 className="text-2xl font-bold text-white">⚠️ Uyarı</h2>
                    </div>

                    <p className="text-gray-300 mb-2">
                        Bazı launcher'lar bulunamadı veya atlandı!
                    </p>

                    <p className="text-gray-400 text-sm mb-6">
                        <strong>Ayarlar → Launcher Settings</strong> kısmından sihirbazı tekrar başlatabilir
                        ve eksik launcher'ları manuel olarak ekleyebilirsiniz.
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={confirmSkip}
                            className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl transition-all"
                        >
                            Anladım, Devam Et
                        </button>
                        <button
                            onClick={() => setShowSkipWarning(false)}
                            className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
                        >
                            Geri Dön
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Main Setup Wizard UI
    return (
        <div className="min-h-screen bg-background p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-2xl mb-4">
                        <ShieldAlert className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">🎮 İlk Kurulum</h1>
                    <p className="text-gray-400 text-lg">
                        Launcher'larınız otomatik olarak tespit edildi
                    </p>
                </div>

                {/* Launcher Cards */}
                <div className="space-y-4 mb-8">
                    {launchers.map((launcher) => {
                        const statusConfig = {
                            Found: {
                                icon: <CheckCircle className="w-8 h-8 text-green-500" />,
                                bgColor: 'bg-green-500/10',
                                borderColor: 'border-green-500/30',
                                emoji: '✅',
                                label: 'Bulundu'
                            },
                            NotFound: {
                                icon: <AlertCircle className="w-8 h-8 text-yellow-500" />,
                                bgColor: 'bg-yellow-500/10',
                                borderColor: 'border-yellow-500/30',
                                emoji: '❓',
                                label: 'Bulunamadı'
                            },
                            UserSkipped: {
                                icon: <XCircle className="w-8 h-8 text-gray-500" />,
                                bgColor: 'bg-gray-500/10',
                                borderColor: 'border-gray-500/30',
                                emoji: '❌',
                                label: 'Kurulu Değil'
                            }
                        };

                        const config = statusConfig[launcher.status];

                        return (
                            <div
                                key={launcher.id}
                                className={`p-6 rounded-xl border ${config.bgColor} ${config.borderColor} transition-all`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="flex-shrink-0">
                                            {config.icon}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-xl font-bold text-white">{launcher.name}</h3>
                                                <span className="text-sm px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
                                                    {config.label}
                                                </span>
                                            </div>
                                            {launcher.path && (
                                                <p className="text-xs text-gray-500 font-mono truncate">
                                                    {launcher.path}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {launcher.status === 'NotFound' && (
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => selectManualPath(launcher.id)}
                                                className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg text-sm font-bold transition-all whitespace-nowrap"
                                            >
                                                📁 Konumunu Göster
                                            </button>
                                            <button
                                                onClick={() => skipLauncher(launcher.id)}
                                                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm font-bold transition-all"
                                            >
                                                Kurulu Değil
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleComplete}
                        disabled={!allResolved}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${allResolved
                            ? 'bg-primary hover:bg-primary/80 text-white shadow-lg shadow-primary/30 hover:scale-[1.02]'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                            }`}
                    >
                        {allResolved ? '✅ Kurulumu Tamamla' : '⏳ Bazı Launcher\'lar Eksik'}
                    </button>

                    <button
                        onClick={handleSkipWizard}
                        className="w-full py-3 text-gray-400 hover:text-white text-sm transition-colors"
                    >
                        ⏭️ Şimdilik Atla (Settings'ten tekrar açabilirsiniz)
                    </button>
                </div>

                {/* Info Box */}
                <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                    <div className="flex gap-3">
                        <SettingsIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-300">
                            <strong className="text-white">İpucu:</strong> Herhangi bir launcher'ı daha sonra
                            eklemek isterseniz, <strong className="text-blue-400">Ayarlar → Launcher Settings</strong>
                            kısmından sihirbazı tekrar başlatabilirsiniz.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
