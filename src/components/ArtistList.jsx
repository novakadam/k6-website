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
      if (firstImageId.startsWith('fa-')) return "https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/kekrozsacsillagszonyeg-GMUCh.jpeg";
      if (firstImageId.startsWith('tb-')) return "https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/telegdi03-d1d0V.jpg";
      if (firstImageId.startsWith('m-')) return "https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/em0c9927-CdgFi.jpg";
      if (firstImageId.startsWith('kc-')) return "https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/untitled-shoot--_dsc3754--180705--krcs-iIpOX.jpg";
      if (firstImageId.startsWith('kf-')) return "https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/20250308_144239-0N3dM.jpg";
      if (firstImageId.startsWith('mbd-')) return "https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/000_2057v-7af0X.jpg";
      if (firstImageId.startsWith('lj-')) return "https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/img_20250325_092354_edit_1404808335717930-gpEQp.jpg";
    }
    return 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800'; // fallback
  };

  const getPortraitImage = (id) => {
    const portraits = {
      'franta-agi': 'https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/profilkep-csizikbalazs-UhKvW.jpeg',
      'telegdi-balazs': 'https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/telegdibalazs_portre_telegdibalazs-LK9Fq.jpg',
      'minime': 'https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/img_3515-fZ4OW.jpg',
      'korponay-csilla': 'https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/korponai-csilla-portre-4kIBG.jpg',
      'kaiser-fanni': '/images/kaiser-fanni/kf-portre.jpg',
      'magyar-balint': 'https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/mbd-portre-VgUZh.jpg',
      'lantos-judit': 'https://horizons-cdn.hostinger.com/dc70d3c6-523e-4650-8771-66694fd6f85b/lantos-judit-portre-is1AV.jpg'
    };
    return portraits[id] || 'https://images.unsplash.com/photo-1586487069505-2fb34eea9950'; // fallback
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