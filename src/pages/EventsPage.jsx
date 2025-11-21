import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Plus, Trash2, Edit2 } from 'lucide-react';
import Header from '@/components/Header';
import EditableField from '@/components/EditableField';
import { useEditMode } from '@/hooks/useEditMode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { getEvents, addEvent, updateEvent, deleteEvent } from '@/data/eventsStore';
import { eventsData as staticEvents } from '@/data/staticEventsData';

const formatText = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split('\n').map((line, i) => (
    <p key={i} className="mb-2">
      {line.split(urlRegex).map((part, index) =>
        urlRegex.test(part) ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 hover:text-blue-800"
          >
            {part}
          </a>
        ) : (
          part
        )
      )}
    </p>
  ));
};


const EventsPage = () => {
  const isEditMode = useEditMode();
  const [events, setEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    setEvents(staticEvents);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingEvent) {
      updateEvent(editingEvent.id, formData);
      toast({
        title: "Esemény frissítve",
        description: "Az esemény adatai sikeresen frissültek.",
      });
    } else {
      addEvent(formData);
      toast({
        title: "Esemény hozzáadva",
        description: "Az új esemény sikeresen létrejött.",
      });
    }
    
    setEvents(getEvents());
    setIsDialogOpen(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: ''
    });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    deleteEvent(id);
    setEvents(getEvents());
    toast({
      title: "Esemény törölve",
      description: "Az esemény sikeresen törölve lett.",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hu-HU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <Helmet>
        <title>Események - K6 Creative Studios</title>
        <meta name="description" content="Fedezd fel a K6 Creative Studios közelgő kiállításait, workshopjait és eseményeit tehetséges művészeink közreműködésével." />
      </Helmet>

      <div className="min-h-screen bg-[#FAF9F5]">
        <Header />

        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <div className="flex justify-between items-center">
                <EditableField
                  as="h1"
                  className="text-5xl md:text-7xl font-medium tracking-tight"
                  isEditable={isEditMode}
                  initialValue="Események"
                />
                {isEditMode && (
                  <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
                      setIsDialogOpen(isOpen);
                      if (!isOpen) {
                          setEditingEvent(null);
                          setFormData({ title: '', date: '', time: '', location: '', description: '', image: '' });
                      }
                  }}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2" style={{ borderRadius: '8px 8px 24px 24px' }}>
                        <Plus className="w-4 h-4" />
                        Új esemény
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{editingEvent ? 'Esemény szerkesztése' : 'Új esemény hozzáadása'}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input placeholder="Esemény címe" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                        <Input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required />
                        <Input placeholder="Helyszín" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                        <Textarea placeholder="Leírás" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                        <Input placeholder="Kép URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                        <Button type="submit" className="w-full" style={{ borderRadius: '8px 8px 24px 24px' }}>
                          {editingEvent ? 'Módosítás' : 'Hozzáadás'}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>

            <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white overflow-hidden group relative hover:bg-[#E0DCCB]"
                  style={{ borderRadius: '24px 24px 80px 80px' }}
                >
                  
{event.image && (
  <div className="aspect-[4/3] overflow-hidden">
    <img
      src={event.image}
      alt={event.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </div>
)}
                  
                  <div className="p-8">
                    <EditableField as="h2" className="text-2xl font-medium mb-4" isEditable={isEditMode} initialValue={event.title} />
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-gray-600"><Calendar className="w-4 h-4" /><span>{formatDate(event.date)}</span></div>
                      <div className="flex items-center gap-3 text-gray-600"><Clock className="w-4 h-4" /><span>{event.time}</span></div>
                      <div className="flex items-center gap-3 text-gray-600"><MapPin className="w-4 h-4" /><span>{event.location}</span></div>
                    </div>
                    <div className="text-gray-700 leading-relaxed">
                      {formatText(event.description)}
                    </div>
                    {isEditMode && (
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(event)} style={{ borderRadius: '8px 8px 24px 24px' }}><Edit2 className="w-4 h-4" /></Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)} style={{ borderRadius: '8px 8px 24px 24px' }}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EventsPage;