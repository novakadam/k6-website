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
                        <EditableField as="span" isEditable={isEditMode} initialValue="© 2025 K6 Alkotó Műhelyház" />
                    </p>
                    <p className="text-gray-600">
                       <EditableField as="span" isEditable={isEditMode} initialValue="2000 Szentendre, Kőzúzó utca 6." />
                    </p>
                    <p className="mt-6 text-sm text-gray-500">
                        powered by{' '}
                        <a href="https://www.karcmedia.com" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-gray-700">Karc Média</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;