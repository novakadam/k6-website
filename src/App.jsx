import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HomePage from '@/pages/HomePage';
import ArtistPage from '@/pages/ArtistPage';
import ArtistsPage from '@/pages/ArtistsPage';
import ContactPage from '@/pages/ContactPage';
import EventsPage from '@/pages/EventsPage';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import Footer from '@/components/Footer';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Helmet>
        <title>K6 Creative Studios - Contemporary Art & Design</title>
        <meta name="description" content="K6 Creative Studios showcases exceptional contemporary artists including ceramicists, glass artists, fashion designers, and lighting designers." />
      </Helmet>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artist/:artistId" element={<ArtistPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;