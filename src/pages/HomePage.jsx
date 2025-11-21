import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ArtistList from '@/components/ArtistList';
import HeroImage from '@/components/HeroImage';
import EditableField from '@/components/EditableField';
import { useEditMode } from '@/hooks/useEditMode';
import UpcomingEvents from '@/components/UpcomingEvents';

const HomePage = () => {
  const isEditMode = useEditMode();

  return (
    <>
      <Helmet>
        <title>K6 Creative Studios - Contemporary Art & Design</title>
        <meta name="description" content="A K6 egy élő, kortárs alkotói tér Szentendrén, ahol keramikusok, üvegművészek, textiltervezők és tárgyalkotók dolgoznak egy inspiráló közösségben." />
      </Helmet>

      <div className="min-h-screen bg-[#FAF9F5]">
        <Header />

        <main>
          <section className="pt-24 md:pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <EditableField
                      as="h1"
                      className="text-4xl md:text-7xl font-medium mb-8 tracking-tight leading-tight"
                      isEditable={isEditMode}
                      initialValue="Ahol az anyag, a forma és a gondolat találkozik."
                    />
                  </div>
                  <div className="relative">
                    <HeroImage />
                  </div>
                </div>
              </motion.div>

              <div className="max-w-[1000px] mx-auto px-6 my-24">
                <EditableField
                  as="p"
                  inputType="textarea"
                  className="text-lg text-gray-800 leading-relaxed"
                  isEditable={isEditMode}
                  initialValue="A K6 egy élő, kortárs alkotói tér Szentendrén, ahol több művész dolgozik egymás mellett, saját műhelyben, mégis egy közösség részeként. Keramikusok, üvegművészek, textiltervezők és tárgyalkotók osztoznak ezen a nyugodt, inspiráló házon, ahol nap mint nap új formák, textúrák és gondolatok születnek. A K6 lényege a párbeszéd, az együtt gondolkodás és a szabad kísérletezés — egy nyitott, lélegző művésztelep atmoszférája. Időről időre nyitott műhelyekkel, workshopokkal és eseményekkel várjuk azokat, akik kíváncsiak az alkotás folyamatára és az alkotók világára."
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full mb-16"
              >
                <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden" style={{ borderRadius: '24px 24px 36px 36px' }}>
                  <img alt="Two abstract green glass sculptures on a rock next to a partial view of a modern building" className="w-full h-full object-cover" src="https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/c759566e1237525cb3b399e02bd4f3e5.png" />
                </div>
                 <div className="max-w-[1000px] mx-auto px-6 mt-8">
                    <EditableField
                        as="h2"
                        className="text-4xl md:text-5xl font-light text-center"
                        isEditable={isEditMode}
                        initialValue="Közösség, amely kortárs alkotókat és kísérletező műhelyeket kapcsol össze."
                    />
                 </div>
              </motion.div>
            </div>
          </section>

          <section className="py-24 bg-[#ECE8D8]">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <EditableField
                  as="h2"
                  className="text-4xl md:text-6xl font-medium mb-4 tracking-tight"
                  isEditable={isEditMode}
                  initialValue="Alkotóink"
                />
              </motion.div>
              <div className="max-w-[1000px] mx-auto">
                <ArtistList />
              </div>
            </div>
          </section>

          <UpcomingEvents />

        </main>
      </div>
    </>
  );
};

export default HomePage;