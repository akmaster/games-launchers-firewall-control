import { useState, useEffect, useRef } from 'react';
import { Notebook, Plus, Trash2, Save, X, Lock, Download, Upload, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import { useModal } from '../contexts/ModalContext';

interface Note {
    id: string;
    title: string;
    content: string;
    date: string;
}

export default function NotesView() {
    const { strings } = useLanguage();
    const { showModal } = useModal();
    const [notes, setNotes] = useState<Note[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load notes from localStorage on mount
    useEffect(() => {
        const savedNotes = localStorage.getItem('user_notes');
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes));
            } catch (e) {
                console.error("Failed to parse notes", e);
            }
        }
    }, []);

    // Save notes to localStorage whenever they change
    const saveNotesToStorage = (updatedNotes: Note[]) => {
        setNotes(updatedNotes);
        localStorage.setItem('user_notes', JSON.stringify(updatedNotes));
    };

    const handleSaveNote = () => {
        if (!currentNote) return;

        const newNote = {
            ...currentNote,
            title: currentNote.title.trim() || strings.notes.title_placeholder,
            date: new Date().toLocaleDateString()
        };

        let updatedNotes;
        if (notes.find(n => n.id === newNote.id)) {
            // Update existing
            updatedNotes = notes.map(n => n.id === newNote.id ? newNote : n);
        } else {
            // Add new
            updatedNotes = [newNote, ...notes];
        }

        saveNotesToStorage(updatedNotes);
        setIsEditing(false);
        setCurrentNote(null);
    };

    const handleDeleteNote = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();

        showModal({
            type: 'confirm',
            title: strings.notes.delete_confirm?.split('?')[0] || 'Delete Note', // Basic title extraction
            message: strings.notes.delete_confirm,
            confirmText: strings.notes.delete_confirm?.includes('sil') ? 'Sil' : 'Delete', // Rudimentary localization check
            cancelText: strings.notes.cancel,
            onConfirm: () => {
                const updatedNotes = notes.filter(n => n.id !== id);
                saveNotesToStorage(updatedNotes);
            }
        });
    };

    const startNewNote = () => {
        setCurrentNote({
            id: Date.now().toString(),
            title: '',
            content: '',
            date: new Date().toLocaleDateString()
        });
        setIsEditing(true);
    };

    const handleExport = async () => {
        try {
            const content = JSON.stringify(notes, null, 2);
            const defaultFilename = `gamerhub-notes-backup-${new Date().toISOString().slice(0, 10)}.json`;

            const filePath = await save({
                defaultPath: defaultFilename,
                filters: [{
                    name: 'JSON Files',
                    extensions: ['json']
                }]
            });

            if (filePath) {
                await writeTextFile(filePath, content);
                showModal({
                    type: 'success',
                    title: strings.notes.export,
                    message: "Backup saved successfully!\n" + filePath,
                    confirmText: "OK"
                });
            }
        } catch (error) {
            console.error('Export failed:', error);
            showModal({
                type: 'error',
                title: 'Export Failed',
                message: "Failed to save backup: " + error,
            });
        }
    };

    const handleImportClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedNotes = JSON.parse(e.target?.result as string);
                if (Array.isArray(importedNotes)) {
                    // Check IDs
                    const existingIds = new Set(notes.map(n => n.id));
                    const newNotes = importedNotes.filter((n: Note) => !existingIds.has(n.id));

                    const mergedNotes = [...newNotes, ...notes];
                    saveNotesToStorage(mergedNotes);

                    showModal({
                        type: 'success',
                        title: strings.notes.import,
                        message: `Successfully imported ${newNotes.length} new notes.`,
                        confirmText: "Cool!"
                    });
                } else {
                    showModal({
                        type: 'error',
                        title: 'Import Failed',
                        message: "Invalid file format. Please select a valid backup file.",
                    });
                }
            } catch (err) {
                console.error(err);
                showModal({
                    type: 'error',
                    title: 'Import Failed',
                    message: "Failed to parse file: " + err,
                });
            }
        };
        reader.readAsText(file);
        // Reset input
        event.target.value = '';
    };

    return (
        <div className="h-full p-8 overflow-y-auto relative">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportFile}
                accept=".json"
                className="hidden"
            />

            {/* Header */}
            <div className="flex flex-wrap items-center justify-between mb-8 sticky top-0 bg-background/80 backdrop-blur-md py-4 z-10 border-b border-white/5 gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/20 rounded-xl">
                        <Notebook className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white">{strings.notes.title}</h1>
                        <p className="text-indigo-200/60 text-sm flex items-center gap-2">
                            <Lock className="w-3 h-3" /> {strings.notes.desc}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleImportClick}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold transition-all border border-white/5"
                        title={strings.notes.import}
                    >
                        <Upload className="w-4 h-4" />
                        <span className="hidden lg:inline text-sm">{strings.notes.import}</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold transition-all border border-white/5"
                        title={strings.notes.export}
                    >
                        <Download className="w-4 h-4" />
                        <span className="hidden lg:inline text-sm">{strings.notes.export}</span>
                    </button>
                    <button
                        onClick={startNewNote}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95 border border-indigo-400/20"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="hidden md:inline">{strings.notes.new_note}</span>
                    </button>
                </div>
            </div>

            {/* Privacy Alert with Import/Export Hint */}
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-4 items-start animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="p-2 bg-red-500/20 rounded-lg mt-1">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                    <h3 className="text-red-400 font-bold text-sm tracking-wide mb-1">
                        {strings.notes.privacy_warning.split(':')[0]}
                    </h3>
                    <p className="text-red-200/80 text-sm leading-relaxed">
                        {strings.notes.data_loss_warning}
                    </p>
                </div>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {notes.map(note => (
                    <div
                        key={note.id}
                        onClick={() => { setCurrentNote(note); setIsEditing(true); }}
                        className="group relative h-64 bg-surface border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
                    >
                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                            {note.title}
                        </h3>
                        <span className="text-xs text-gray-500 mb-4 block font-mono">
                            {note.date}
                        </span>
                        <p className="text-gray-400 text-sm line-clamp-5 whitespace-pre-wrap">
                            {note.content}
                        </p>

                        {/* Actions */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={(e) => handleDeleteNote(note.id, e)}
                                className="p-2 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {notes.length === 0 && (
                    <div className="col-span-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-gray-500">
                        <Notebook className="w-12 h-12 mb-4 opacity-20" />
                        <p>{strings.notes.no_notes}</p>
                    </div>
                )}
            </div>

            {/* Edit/Create Modal */}
            {isEditing && currentNote && (
                <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl p-8 flex flex-col animate-in fade-in zoom-in-95 duration-200">
                    <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <Notebook className="w-6 h-6 text-indigo-500" />
                                {strings.notes.edit_note}
                            </h2>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 rounded-lg hover:bg-white/10 text-gray-400 transition-colors text-sm font-bold"
                                >
                                    {strings.notes.cancel}
                                </button>
                                <button
                                    onClick={handleSaveNote}
                                    className="px-6 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-colors text-sm font-bold flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    {strings.notes.save}
                                </button>
                            </div>
                        </div>

                        <input
                            type="text"
                            value={currentNote.title}
                            onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                            placeholder={strings.notes.title_placeholder}
                            className="w-full bg-transparent text-4xl font-bold text-white placeholder-gray-600 focus:outline-none mb-6 font-display"
                        />

                        <textarea
                            value={currentNote.content}
                            onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                            placeholder={strings.notes.content_placeholder}
                            className="w-full flex-1 bg-surface/50 rounded-2xl p-6 text-lg text-gray-300 placeholder-gray-600 focus:outline-none resize-none focus:ring-2 focus:ring-indigo-500/20"
                        />

                        <div className="mt-4 text-center">
                            <p className="text-red-500/70 text-xs tracking-widest uppercase">{strings.notes.data_loss_warning}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
