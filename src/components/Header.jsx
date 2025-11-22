import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import EditableField from '@/components/EditableField';
import { useEditMode } from '@/hooks/useEditMode';
const MobileNav = ({
  isOpen,
  onClose
}) => {
  const isEditMode = useEditMode();
  const navItems = [{
    to: '/artists',
    label: 'Alkotók'
  }, {
    to: '/events',
    label: 'Események'
  }, {
    to: '/contact',
    label: 'Kapcsolat'
  }];
  return <AnimatePresence>
      {isOpen && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} transition={{
      duration: 0.3
    }} className="fixed inset-0 z-50 bg-gradient-to-b from-[#D4CCB8]/95 to-[#FAF9F5]/95 md:hidden" onClick={onClose}>
          <motion.div initial={{
        y: '-100%'
      }} animate={{
        y: '0%'
      }} exit={{
        y: '-100%'
      }} transition={{
        duration: 0.4,
        ease: 'easeInOut'
      }} className="flex flex-col items-center justify-center h-full" onClick={e => e.stopPropagation()}>
            <div className="mb-12">
              <Link to="/" onClick={onClose}>
                <img alt="K6 Creative Studios Logo" className="h-24 w-auto" src="/images/etc/logo-K6-uj-v1.png" />
              </Link>
            </div>
            <nav className="flex flex-col items-center gap-6 text-center">
              {navItems.map(item => <Link key={item.to} to={item.to} onClick={onClose} className="px-8 py-3 text-xl text-black bg-transparent hover:bg-black hover:text-white transition-colors font-medium" style={{
            borderRadius: '8px 8px 24px 24px'
          }}>
                  <EditableField as="span" isEditable={isEditMode} initialValue={item.label} />
                </Link>)}
            </nav>
          </motion.div>
          <button onClick={onClose} className="absolute top-6 right-6 text-black" aria-label="Close menu">
            <X size={32} />
          </button>
        </motion.div>}
    </AnimatePresence>;
};
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isEditMode = useEditMode();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  const headerClasses = `
     sticky top-0 left-0 right-0 z-40 transition-colors duration-300
  ${isScrolled || isMobileMenuOpen ? 'bg-gradient-to-b from-[#ECE8D8]/95 to-transparent' : 'bg-gradient-to-b from-[#ECE8D8]/80 to-transparent'}
`;
  const logoHeight = isScrolled || isMobileMenuOpen ? 'h-16' : 'h-32';
  return <>
      <header className={headerClasses}>
        <div className="max-w-7xl mx-auto px-6 transition-all duration-300">
          <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'py-4' : 'py-8'}`}>
            <Link to="/" className="block hover:opacity-80 transition-opacity z-50">
              <img alt="K6 Creative Studios Logo" className={`no-frame ${logoHeight} w-auto transition-all duration-300`} src="/images/etc/logo-K6-uj-v1.png" />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/artists" className="px-5 py-2 text-black bg-transparent hover:bg-black hover:text-white transition-colors text-base font-medium" style={{
              borderRadius: '8px 8px 24px 24px'
            }}>
                <EditableField as="span" isEditable={isEditMode} initialValue="Alkotók" />
              </Link>
              <Link to="/events" className="px-5 py-2 text-black bg-transparent hover:bg-black hover:text-white transition-colors text-base font-medium" style={{
              borderRadius: '8px 8px 24px 24px'
            }}>
                <EditableField as="span" isEditable={isEditMode} initialValue="Események" />
              </Link>
              <Link to="/contact" className="px-5 py-2 text-black bg-transparent hover:bg-black hover:text-white transition-colors text-base font-medium" style={{
              borderRadius: '8px 8px 24px 24px'
            }}>
                <EditableField as="span" isEditable={isEditMode} initialValue="Kapcsolat" />
              </Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden z-50">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-black" aria-label="Open menu">
                {!isMobileMenuOpen && <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>;
};
export default Header;