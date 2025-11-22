import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { artistsData } from '@/data/artistsData';
import EditableField from '@/components/EditableField';
import { useEditMode } from '@/hooks/useEditMode';

const ArtistList = () => {
  const isEditMode = useEditMode();
  const artists = Object.entries(artistsData);

  const getArtworkImage = (artist) => {
    if (artist.gallery && artist.gallery.length > 0) {
      const firstImageId = artist.gallery[0].id;
      if (firstImageId.startsWith('fa-')) return "/images/franta-agi/fa-work-01.jpg";
      if (firstImageId.startsWith('tb-')) return "/images/telegdi-balazs/tb-work-01.jpg";
      if (firstImageId.startsWith('m-')) return "/images/minime/m-work-01.jpg";
      if (firstImageId.startsWith('kc-')) return "/images/korponay-csilla/kc-work-01.jpg";
      if (firstImageId.startsWith('kf-')) return "/images/kaiser-fanni/kf-work-06.jpg";
      if (firstImageId.startsWith('mbd-')) return "/images/magyar-balint/mbd-work-01.jpg";
      if (firstImageId.startsWith('lj-')) return "/images/lantos-judit/lj-work-01.jpg";
    }
    return '/images/kaiser-fanni/kf-work-06.jpg'; // fallback
  };

  const getPortraitImage = (id) => {
    const portraits = {
      'franta-agi': '/images/franta-agi/fa-profil.jpg',
      'telegdi-balazs': '/images/telegdi-balazs/tb-portre.jpg',
      'minime': '/images/minime/m-portre-07.jpg',
      'korponay-csilla': '/images/korponay-csilla/kc-portre.jpg',
      'kaiser-fanni': '/images/kaiser-fanni/kf-portre.jpg',
      'magyar-balint': '/images/magyar-balint/mbd-portre.jpg',
      'lantos-judit': '/images/lantos-judit/lj-portre.jpg'
    };
    return portraits[id] || '/images/kaiser-fanni/kf-portre.jpg'; // fallback
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {artists.map(([id, artist], index) => {
        const artworkImage = getArtworkImage(artist);
        const portraitImage = getPortraitImage(id);
        const radius = '24px 24px 36px 36px';

        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              to={`/artist/${id}`}
              className="group block"
            >
              <div className="relative overflow-hidden mb-4 bg-gray-100" style={{ borderRadius: radius }}>
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={artworkImage}
                    alt={`Artwork by ${artist.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <img
                    src={portraitImage}
                    alt={`Portrait of ${artist.name}`}
                    className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <EditableField
                    as="h3"
                    className="text-xl font-medium mb-1 group-hover:text-gray-600 transition-colors"
                    isEditable={isEditMode}
                    initialValue={artist.name}
                  />
                  <EditableField
                    as="p"
                    className="text-gray-500"
                    isEditable={isEditMode}
                    initialValue={artist.discipline}
                  />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 mt-1 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ArtistList;