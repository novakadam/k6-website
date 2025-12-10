// src/pages/ArtistPage.jsx

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Mail, Globe, Instagram, X, ChevronLeft, ChevronRight, Facebook } from 'lucide-react';
import { artistsData } from '@/data/artistsData';
import Header from '@/components/Header';
import EditableField from '@/components/EditableField';
import { useEditMode } from '@/hooks/useEditMode';

const Lightbox = ({ images, selectedIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative max-w-4xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <img
          src={currentImage.image}
          alt={currentImage.title || 'Artwork'}
          className="w-full h-full object-contain"
        />

        {/*currentImage.title && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white text-sm px-4 py-2 rounded-lg">
            {currentImage.title}
          </div>
        )*/}
      </motion.div>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-2xl"
        aria-label="Bezárás"
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
            aria-label="Előző kép"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
            aria-label="Következő kép"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}
    </motion.div>
  );
};

const ArtistPortraits = ({ artistId }) => {
  // EGYELŐRE meghagyjuk a meglévő portré mappinget,
  // csak később visszük át artistsData-ba, ha szeretnéd.
  const portraits = {
    'franta-agi': (
      <img
        alt="Portrait of Franta Ági"
        className="w-full h-full object-cover"
        style={{ borderRadius: '48px 48px 12px 12px' }}
        src="/images/franta-agi/fa-profil.jpg"
      />
    ),
    'telegdi-balazs': (
      <img
        alt="Portrait of Telegdi Balázs"
        className="w-full h-full object-cover"
        style={{ borderRadius: '12px 48px 48px 12px' }}
        src="/images/telegdi-balazs/tb-portre.jpg"
      />
    ),
    minime: (
      <img
        alt="Portrait of Minime"
        className="w-full h-full object-cover"
        style={{ borderRadius: '36px 12px 36px 12px' }}
        src="/images/minime/m-portre-07.jpg"
      />
    ),
    'korponay-csilla': (
      <img
        alt="Portrait of Korponay Csilla"
        className="w-full h-full object-cover"
        style={{ borderRadius: '12px 36px 12px 36px' }}
        src="/images/korponay-csilla/kc-portre.jpg"
      />
    ),
    'kaiser-fanni': (
      <img
        alt="Portrait of Kaiser Fanni"
        className="w-full h-full object-cover"
        style={{ borderRadius: '48px 12px 48px 12px' }}
        src="/images/kaiser-fanni/kf-portre.jpg"
      />
    ),
    'magyar-balint': (
      <img
        alt="Portrait of Magyar Bálint Dániel"
        className="w-full h-full object-cover"
        style={{ borderRadius: '48px 12px 48px 12px' }}
        src="/images/magyar-balint/mbd-portre.jpg"
      />
    ),
    'lantos-judit': (
      <img
        alt="Portrait of Lantos Judit"
        className="w-full h-full object-cover"
        style={{ borderRadius: '24px 24px 48px 48px' }}
        src="/images/lantos-judit/lj-portre.jpg"
      />
    )
  };

  return (
    portraits[artistId] || (
      <img
        className="w-full h-full object-cover"
        style={{ borderRadius: '48px 48px 12px 12px' }}
        alt="Portrait of the artist"
        src="/images/lantos-judit/lj-portre.jpg"
      />
    )
  );
};

const ArtistGallery = ({ artistId, onImageClick }) => {
  const galleryItems = artistsData[artistId]?.gallery || [];
  const radiusStyle = '24px 24px 36px 36px';

  return (
    <div className="columns-1 md:columns-2 gap-8">
      {galleryItems.map((item, index) => (
        <motion.div
          key={item.id}
          className="break-inside-avoid mb-8 cursor-pointer group relative overflow-hidden"
          onClick={() => onImageClick(index)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          style={{ borderRadius: radiusStyle }}
        >
          <img
            src={item.image}
            alt={item.title || 'Artwork'}
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            style={{ borderRadius: radiusStyle }}
          />
          <div
            className="absolute inset-0 bg-[#FAF9F5]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ borderRadius: radiusStyle }}
          />
        </motion.div>
      ))}
    </div>
  );
};

const ArtistPage = () => {
  const { artistId } = useParams();
  const artist = artistsData[artistId];
  const isEditMode = useEditMode();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!artist) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] text-black flex items-center justify-center">
        <p>Nincs ilyen alkotó.</p>
      </div>
    );
  }

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{artist.name} – K6 Műhelyház</title>
      </Helmet>

      <div className="min-h-screen bg-[#FAF9F5] text-black">
        <Header />

        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <header className="mb-24">
              <EditableField
                as="h1"
                className="text-5xl md:text-6xl font-medium mb-4 tracking-tight"
                isEditable={isEditMode}
                initialValue={artist.name}
              />
              <EditableField
                as="p"
                className="text-xl md:text-2xl text-gray-600 max-w-2xl"
                isEditable={isEditMode}
                initialValue={artist.discipline}
              />
            </header>

            <section className="mb-24 md:mb-32">
              <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16">
                <div className="space-y-6 text-lg text-gray-800 leading-relaxed">
                  <EditableField
                    as="h2"
                    className="text-2xl font-medium mb-6"
                    isEditable={isEditMode}
                    initialValue="Bemutatkozás"
                  />
                  {artist.bio.split('\n\n').map((paragraph, index) => (
                    <EditableField
                      key={index}
                      as="p"
                      type="textarea"
                      className="mb-4"
                      isEditable={isEditMode}
                      initialValue={paragraph}
                    />
                  ))}
                </div>

                <div>
                  <div className="w-full aspect-[3/4] bg-[#F7F7F7] mb-8">
                    <ArtistPortraits artistId={artistId} />
                  </div>

                  <div className="space-y-5">
                    <EditableField
                      as="h2"
                      className="text-2xl font-medium mb-4"
                      isEditable={isEditMode}
                      initialValue="Kapcsolat"
                    />

                    {artist.contact.email && (
                      <div className="flex items-center gap-3 text-lg group">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <a
                          href={`mailto:${artist.contact.email}`}
                          className="hover:text-gray-600"
                        >
                          <EditableField
                            as="span"
                            isEditable={isEditMode}
                            initialValue={artist.contact.email}
                          />
                        </a>
                      </div>
                    )}

                    {artist.contact.website && (
                      <div className="flex items-center gap-3 text-lg group">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <a
                          href={artist.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-600"
                        >
                          <EditableField
                            as="span"
                            isEditable={isEditMode}
                            initialValue={artist.contact.website}
                          />
                        </a>
                      </div>
                    )}

                    {artist.contact.instagram && (
                      <div className="flex items-center gap-3 text-lg group">
                        <Instagram className="w-5 h-5 text-gray-400" />
                        <a
                          href={artist.contact.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-600"
                        >
                          <EditableField
                            as="span"
                            isEditable={isEditMode}
                            initialValue="Instagram"
                          />
                        </a>
                      </div>
                    )}

                    {artist.contact.facebook && (
                      <div className="flex items-center gap-3 text-lg group">
                        <Facebook className="w-5 h-5 text-gray-400" />
                        <a
                          href={artist.contact.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-600"
                        >
                          <EditableField
                            as="span"
                            isEditable={isEditMode}
                            initialValue="Facebook"
                          />
                        </a>
                      </div>
                    )}

                    {artist.contact.etsy && (
                      <div className="flex items-center gap-3 text-lg group">
                        <X className="w-5 h-5 text-gray-400" />
                        <a
                          href={artist.contact.etsy}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-600"
                        >
                          <EditableField
                            as="span"
                            isEditable={isEditMode}
                            initialValue="Etsy"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="max-w-[1000px] mx-auto">
                <EditableField
                  as="h2"
                  className="text-3xl font-medium mb-8"
                  isEditable={isEditMode}
                  initialValue="Válogatás a munkáimból:"
                />
                <ArtistGallery artistId={artistId} onImageClick={openLightbox} />
              </div>
            </section>
          </div>
        </main>

        <AnimatePresence>
          {lightboxOpen && (
            <Lightbox
              images={artist.gallery}
              selectedIndex={selectedImageIndex}
              onClose={closeLightbox}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ArtistPage;
