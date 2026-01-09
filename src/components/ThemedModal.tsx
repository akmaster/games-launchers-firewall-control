import { Check, AlertTriangle, Info } from 'lucide-react';

export type ModalType = 'info' | 'success' | 'warning' | 'error' | 'confirm';

interface ThemedModalProps {
    isOpen: boolean;
    type: ModalType;
    title: string;
    message: string;
    onClose: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export default function ThemedModal({
    isOpen,
    type,
    title,
    message,
    onClose,
    onConfirm,
    confirmText = "OK",
    cancelText = "Cancel"
}: ThemedModalProps) {
    if (!isOpen) return null;

    // Type-specific styles and icons
    const styles = {
        info: { color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", icon: <Info className="w-6 h-6 text-indigo-400" /> },
        success: { color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", icon: <Check className="w-6 h-6 text-green-400" /> },
        warning: { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: <AlertTriangle className="w-6 h-6 text-orange-400" /> },
        error: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: <AlertTriangle className="w-6 h-6 text-red-400" /> },
        confirm: { color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", icon: <AlertTriangle className="w-6 h-6 text-indigo-400" /> },
    };

    const style = styles[type];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-md animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-[#0f1014] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Glow Effect */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${type === 'error' ? 'from-red-500 via-orange-500 to-red-500' : 'from-indigo-500 via-purple-500 to-indigo-500'} opacity-50`}></div>

                <div className="p-6">
                    <div className="flex gap-4">
                        <div className={`p-3 rounded-xl h-fit ${style.bg} ${style.border} border`}>
                            {style.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2 font-display">{title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        {(type === 'confirm' || type === 'error' && onConfirm) && (
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                {cancelText}
                            </button>
                        )}

                        <button
                            onClick={() => {
                                if (onConfirm) onConfirm();
                                onClose();
                            }}
                            className={`px-6 py-2 rounded-lg text-sm font-bold text-white shadow-lg transition-all active:scale-95 flex items-center gap-2
                                ${type === 'error' || (type === 'confirm' && title.toLowerCase().includes('delete')) ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' :
                                    type === 'success' ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' :
                                        'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/20'
                                } `}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
