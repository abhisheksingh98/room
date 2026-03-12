import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const PortalModal: React.FC<PortalModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    return createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-slate-900 hover:bg-white transition-colors border border-slate-100 shadow-sm"
                >
                    <i className="fas fa-times"></i>
                </button>
                <div className="overflow-y-auto max-h-[90vh]">
                    {children}
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default PortalModal;
