import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Mail, Globe, Instagram, X, ChevronLeft, ChevronRight, Facebook } from 'lucide-react';
import { artistsData } from '@/data/artistsData';
import Header from '@/components/Header';
import EditableField from '@/components/EditableField';
import { useEditMode } from '@/hooks/useEditMode';
const Lightbox = ({
  images,
  selectedIndex,
  onClose,
  imageComponents
}) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const handleNext = e => {
    e.stopPropagation();
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };
  const handlePrev = e => {
    e.stopPropagation();
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);
  const currentImage = images[currentIndex];
  if (!currentImage) return null;
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{
      scale: 0.9,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} exit={{
      scale: 0.9,
      opacity: 0
    }} className="relative max-w-4xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.2
        }} className="w-full h-full">
            {React.cloneElement(imageComponents[currentImage.id], {
            className: 'w-full h-full object-contain !border-0'
          })}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors" aria-label="Close lightbox">
        <X size={32} />
      </button>

      <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors bg-black/30 rounded-full p-2" aria-label="Previous image">
        <ChevronLeft size={32} />
      </button>

      <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors bg-black/30 rounded-full p-2" aria-label="Next image">
        <ChevronRight size={32} />
      </button>
    </motion.div>;
};
const ArtistGallery = ({
  artistId,
  onImageClick
}) => {
  const imageComponents = useMemo(() => ({
    'franta-agi': {
      'fa-1': <img alt="Franta Ági artwork" src="/images/franta-agi/fa-work-01.jpg" />,
      'fa-2': <img alt="Franta Ági artwork" src="/images/franta-agi/fa-work-04.jpg" />,
      'fa-3': <img alt="Franta Ági artwork" src="/images/franta-agi/fa-work-03.jpg" />,
      'fa-4': <img alt="Franta Ági artwork" src="/images/franta-agi/fa-work-02.jpg" />,
      'fa-5': <img alt="Franta Ági artwork" src="/images/franta-agi/fa-work-06.jpg" />,
      'fa-6': <img alt="Franta Ági artwork" src="/images/franta-agi/fa-work-05.jpg" />
    },
    'telegdi-balazs': {
      'tb-1': <img alt="Telegdi Balázs artwork" src="/images/telegdi-balazs/tb-work-06.jpg" />,
      'tb-2': <img alt="Telegdi Balázs artwork" src="/images/telegdi-balazs/tb-work-01.jpg" />,
      'tb-3': <img alt="Telegdi Balázs artwork" src="/images/telegdi-balazs/tb-work-05.jpg" />,
      'tb-4': <img alt="Telegdi Balázs artwork" src="/images/telegdi-balazs/tb-work-02.jpg" />,
      'tb-5': <img alt="Telegdi Balázs artwork" src="/images/telegdi-balazs/tb-work-04.jpg" />,
      'tb-6': <img alt="Telegdi Balázs artwork" src="/images/telegdi-balazs/tb-work-03.jpg" />
    },
    'minime': {
      'm-1': <img alt="Minime artwork" src="/images/minime/m-work-01.jpg" />,
      'm-2': <img alt="Minime artwork" src="/images/minime/m-work-03.jpg" />,
      'm-3': <img alt="Minime artwork" src="/images/minime/m-work-05.jpg" />,
      'm-4': <img alt="Minime artwork" src="/images/minime/m-work-02.jpg" />,
      'm-5': <img alt="Minime artwork" src="/images/minime/m-work-06.jpg" />,
      'm-6': <img alt="Minime artwork" src="/images/minime/m-work-04.jpg" />
    },
    'korponay-csilla': {
      'kc-1':  <img alt="Korponay Csilla artwork" src="/images/korponay-csilla/kc-work-01.jpg" />,
      'kc-2': <img alt="Korponay Csilla artwork" src="/images/korponay-csilla/kc-work-02.jpg" />,
      'kc-3': <img alt="Korponay Csilla artwork" src="/images/korponay-csilla/kc-work-03.jpg" />
    },
    'kaiser-fanni': {
      'kf-1': <img alt="Kaiser Fanni artwork" src="/images/kaiser-fanni/kf-work-02.jpg" />,
      'kf-2': <img alt="Kaiser Fanni artwork" src="/images/kaiser-fanni/kf-work-05.jpg" />,
      'kf-3': <img alt="Kaiser Fanni artwork" src="/images/kaiser-fanni/kf-work-04.jpg" />,
      'kf-4': <img alt="Kaiser Fanni artwork" src="/images/kaiser-fanni/kf-work-03.jpg" />,
      'kf-5': <img alt="Kaiser Fanni artwork" src="/images/kaiser-fanni/kf-work-06.jpg" />,
      'kf-6': <img alt="Kaiser Fanni artwork" src="/images/kaiser-fanni/kf-work-07.jpg" />,
      'kf-7': <img alt="Kaiser Fanni artwork" src="/images/kaiser-fanni/kf-work-01.jpg" />,
    },
    'magyar-balint': {
      'mbd-1': <img alt="Magya Bálint Dániel artwork" src="/images/magyar-balint/mbd-work-01.jpg" />,
      'mbd-2': <img alt="Magya Bálint Dániel artwork" src="/images/magyar-balint/mbd-work-02.jpg" />,
      'mbd-3': <img alt="Magya Bálint Dániel artwork" src="/images/magyar-balint/mbd-work-03.jpg" />,
      'mbd-4': <img alt="Magya Bálint Dániel artwork" src="/images/magyar-balint/mbd-work-04.jpg" />,
      'mbd-5': <img alt="Magya Bálint Dániel artwork" src="/images/magyar-balint/mbd-work-05.jpg" />,
      'mbd-6': <img alt="Magya Bálint Dániel artwork" src="/images/magyar-balint/mbd-work-06.jpg" />,
      'mbd-7': <img alt="Magya Bálint Dániel artwork" src="/images/magyar-balint/mbd-work-07.jpg" />,
    },
    'lantos-judit': {
      'lj-1': <img alt="Lantos Judit artwork" src="/images/lantos-judit/lj-work-01.jpg" />,
      'lj-2': <img alt="Lantos Judit artwork" src="/images/lantos-judit/lj-work-04.jpg" />,
      'lj-3': <img alt="Lantos Judit artwork" src="/images/lantos-judit/lj-work-02.jpg" />,
      'lj-4': <img alt="Lantos Judit artwork" src="/images/lantos-judit/lj-work-03.jpg" />,
      'lj-5': <img alt="Lantos Judit artwork" src="/images/lantos-judit/lj-work-05.jpg" />,
    }
  }), [artistId]);
  const currentArtistImages = imageComponents[artistId] || {};
  const galleryItems = artistsData[artistId]?.gallery || [];
  return <div className="columns-1 md:columns-2 gap-8">
      {galleryItems.map((item, index) => {
      const radiusStyle = '24px 24px 36px 36px';
      return <motion.div key={item.id} className="break-inside-avoid mb-8 cursor-pointer group relative overflow-hidden" onClick={() => onImageClick(index, currentArtistImages)} initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        amount: 0.2
      }} transition={{
        duration: 0.5,
        delay: index * 0.05
      }} style={{
        borderRadius: radiusStyle
      }}>
            {React.cloneElement(currentArtistImages[item.id], {
          className: 'w-full h-auto object-contain transition-transform duration-300',
          style: {
            borderRadius: radiusStyle
          }
        })}
            <div className="absolute inset-0 bg-[#FAF9F5]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
          borderRadius: radiusStyle
        }} />
          </motion.div>;
    })}
    </div>;
};
const ArtistPortraits = ({
  artistId
}) => {
  const portraits = {
    'franta-agi': <img alt="Portrait of Franta Ági" className="w-full h-full object-cover" style={{
      borderRadius: '48px 48px 12px 12px'
    }} src="/images/franta-agi/fa-profil.jpg" />,
    'telegdi-balazs': <img alt="Portrait of Telegdi Balázs" className="w-full h-full object-cover" style={{
      borderRadius: '12px 48px 48px 12px'
    }} src="/images/telegdi-balazs/tb-portre.jpg" />,
    'minime': <img alt="Portrait of Minime" className="w-full h-full object-cover" style={{
      borderRadius: '36px 12px 36px 12px'
    }} src="/images/minime/m-portre-07.jpg" />,
    'korponay-csilla': <img alt="Portrait of Korponay Csilla" className="w-full h-full object-cover" style={{
      borderRadius: '12px 36px 12px 36px'
    }} src="/images/korponay-csilla/kc-portre.jpg" />,
    'kaiser-fanni': <img alt="Portrait of Kaiser Fanni" className="w-full h-full object-cover" style={{
      borderRadius: '48px 12px 48px 12px'
    }} src="/images/kaiser-fanni/kf-portre.jpg" />,
    'magyar-balint': <img alt="Portrait of Kaiser Fanni" className="w-full h-full object-cover" style={{
      borderRadius: '48px 12px 48px 12px'
    }} src="/images/magyar-balint/mbd-portre.jpg" />,
    'lantos-judit': <img alt="Portrait of Lantos Judit" className="w-full h-full object-cover" style={{
      borderRadius: '24px 24px 48px 48px'
    }} src="/images/lantos-judit/lj-portre.jpg" />
  };
  return portraits[artistId] || <img className="w-full h-full object-cover" style={{
    borderRadius: '48px 48px 12px 12px'
  }} alt="Portrait of the artist" src="/images/kaiser-fanni/kf-portre.jpg" />;
};
const ArtistPage = () => {
  const {
    artistId
  } = useParams();
  const artist = artistsData[artistId];
  const isEditMode = useEditMode();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageComponents, setImageComponents] = useState({});
  const openLightbox = (index, components) => {
    setSelectedImageIndex(index);
    setImageComponents(components);
    setLightboxOpen(true);
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  if (!artist) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
        <p className="text-black text-xl">Artist not found</p>
      </div>;
  }
  return <>
      <Helmet>
        <title>{artist.name} - {artist.discipline} | K6 Creative Studios</title>
        <meta name="description" content={artist.bio.substring(0, 155)} />
      </Helmet>
      
      <div className="min-h-screen bg-[#FAF9F5] text-black">
        <Header />

        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <header className="mb-24">
              <EditableField as="h1" className="text-5xl md:text-7xl font-medium mb-4 tracking-tight" isEditable={isEditMode} initialValue={artist.name} />
              <EditableField as="p" className="text-xl md:text-2xl text-gray-500" isEditable={isEditMode} initialValue={artist.discipline} />
            </header>

            <section className="mb-24 md:mb-32">
              <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16">
                <div className="space-y-6 text-lg text-gray-800 leading-relaxed">
                  <EditableField as="h2" className="text-2xl font-medium mb-6" isEditable={isEditMode} initialValue="Bemutatkozás" />
                  {artist.bio.split('\n\n').map((paragraph, index) => <EditableField key={index} as="p" inputType="textarea" isEditable={isEditMode} initialValue={paragraph} />)}
                </div>
                
                <div>
                  <div className="w-full aspect-[3/4] bg-[#F7F7F7] mb-8">
                    <ArtistPortraits artistId={artistId} />
                  </div>
                  
                  <div className="space-y-5">
                    <EditableField as="h2" className="text-2xl font-medium mb-4" isEditable={isEditMode} initialValue="Kapcsolat" />
                    {artist.contact.email && <div className="flex items-center gap-3 text-lg group">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <a href={`mailto:${artist.contact.email}`} className="hover:text-gray-600">
                          <EditableField as="span" isEditable={isEditMode} initialValue={artist.contact.email} />
                        </a>
                      </div>}
                    {artist.contact.website && <div className="flex items-center gap-3 text-lg group">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <a href={artist.contact.website} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
                          <EditableField as="span" isEditable={isEditMode} initialValue="Website" />
                        </a>
                      </div>}
                    {artist.contact.instagram && <div className="flex items-center gap-3 text-lg group">
                        <Instagram className="w-5 h-5 text-gray-400" />
                        <a href={artist.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
                          <EditableField as="span" isEditable={isEditMode} initialValue="Instagram" />
                        </a>
                      </div>}
                    {artist.contact.facebook && <div className="flex items-center gap-3 text-lg group">
                        <Facebook className="w-5 h-5 text-gray-400" />
                        <a href={artist.contact.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
                          <EditableField as="span" isEditable={isEditMode} initialValue="Facebook" />
                        </a>
                      </div>}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="max-w-[1000px] mx-auto">
                <EditableField as="h2" className="text-3xl font-medium mb-12" isEditable={isEditMode} initialValue="Válogatás a munkáimból:" />
                <ArtistGallery artistId={artistId} onImageClick={openLightbox} />
              </div>
            </section>
          </div>
        </main>

        <AnimatePresence>
          {lightboxOpen && <Lightbox images={artist.gallery} selectedIndex={selectedImageIndex} onClose={closeLightbox} imageComponents={imageComponents} />}
        </AnimatePresence>
      </div>
    </>;
};
export default ArtistPage;