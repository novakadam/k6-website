import React from 'react';
import EditableField from '@/components/EditableField';
import { useEditMode } from '@/hooks/useEditMode';

const Footer = () => {
    const isEditMode = useEditMode();

    return (
        <footer className="py-16 bg-[#ECE8D8]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col text-left font-medium">
                     <p className="text-gray-600">
                        <EditableField as="span" isEditable={isEditMode} initialValue="© 2025 K6 Alkotói műhely" />
                    </p>
                    <p className="text-gray-600">
                       <EditableField as="span" isEditable={isEditMode} initialValue="2000 Szentendre, Kőzúzó utca 6." />
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;