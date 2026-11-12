import React from 'react';
import Seo from '@/components/Seo';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ArtistList from '@/components/ArtistList';
import EditableField from '@/components/EditableField';
import { useEditMode } from '@/hooks/useEditMode';

const ArtistsPage = () => {
  const isEditMode = useEditMode();

  return (
    <>
      <Seo title="Alkotók" description="Ismerd meg a K6 alkotóit: keramikusok, üvegművészek, textiltervezők és tárgyalkotók, akik a szentendrei műhelyházban dolgoznak." />

      <div className="min-h-screen bg-[#FAF9F5]">
        <Header />

        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <EditableField
                as="h1"
                className="text-5xl md:text-7xl font-medium mb-8 tracking-tight"
                isEditable={isEditMode}
                initialValue="Alkotóink"
              />
               <div className="max-w-[1000px]">
                <EditableField
                  as="p"
                  inputType="textarea"
                  className="text-lg text-gray-800 leading-relaxed"
                  isEditable={isEditMode}
                  initialValue="A K6 egy élő, kortárs alkotói tér Szentendrén, ahol több művész dolgozik egymás mellett, saját műhelyben, mégis egy közösség részeként. Ismerd meg alkotóinkat, akiknek munkássága formálja stúdiónk egyedi karakterét."
                />
               </div>
            </motion.div>

            <div className="max-w-[1000px] mx-auto">
              <ArtistList />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ArtistsPage;