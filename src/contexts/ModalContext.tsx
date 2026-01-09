import { createContext, useContext, useState, ReactNode } from 'react';
import ThemedModal, { ModalType } from '../components/ThemedModal';

interface ModalOptions {
    type?: ModalType;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
}

interface ModalContextType {
    showModal: (options: ModalOptions) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalProps, setModalProps] = useState<ModalOptions>({
        type: 'info',
        title: '',
        message: ''
    });

    const showModal = (options: ModalOptions) => {
        setModalProps(options);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ showModal }}>
            {children}
            <ThemedModal
                isOpen={isOpen}
                type={modalProps.type || 'info'}
                title={modalProps.title}
                message={modalProps.message}
                confirmText={modalProps.confirmText}
                cancelText={modalProps.cancelText}
                onConfirm={modalProps.onConfirm}
                onClose={handleClose}
            />
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
