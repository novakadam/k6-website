import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import Header from '@/components/Header';
import EditableField from '@/components/EditableField';
import { useEditMode } from '@/hooks/useEditMode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
  const ContactPage = () => {
  const isEditMode = useEditMode();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) return;

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const finalSubject = subject || `Üzenet a K6 weboldalról - ${name || ''}`;
    const body = `Név: ${name || ''}\nE-mail: ${email || ''}\n\nÜzenet:\n${message || ''}`;

    // e-mail kliens megnyitása
    window.location.href = `mailto:novak.adam@gmail.com?subject=${encodeURIComponent(
      finalSubject
    )}&body=${encodeURIComponent(body)}`;

    // opcionális visszajelzés
    toast({
      title: 'E-mail előkészítve',
      description: 'Megnyitottuk az e-mail kliensedet, itt tudod elküldeni az üzenetet.',
    });
  };

  return <>
      <Helmet>
        <title>Kapcsolat - K6 Creative Studios</title>
        <meta name="description" content="Lépj kapcsolatba a K6 Creative Studiosszal. Látogass el hozzánk, érdeklődj művészeinkről vagy egyeztessünk egy lehetséges együttműködésről." />
      </Helmet>

      <div className="min-h-screen bg-[#FAF9F5]">
        <Header />

        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="mb-16">
              <EditableField as="h1" className="text-5xl md:text-7xl font-medium mb-4 tracking-tight" isEditable={isEditMode} initialValue="Kapcsolat" />
            </motion.div>

            <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16 items-start">
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }}>
                 <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium mb-1"><EditableField as="span" isEditable={isEditMode} initialValue="Cím" /></p>
                      <EditableField as="p" className="text-gray-600" isEditable={isEditMode} initialValue="K6 Creative Studios, 2000 Szentendre, Kőzúzó u. 6." />
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium mb-1"><EditableField as="span" isEditable={isEditMode} initialValue="E-mail" /></p>
                      <EditableField as="a" href="mailto:info@k6studios.com" className="text-gray-600 hover:text-gray-900" isEditable={isEditMode} initialValue="info@k6studios.com" />
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium mb-1"><EditableField as="span" isEditable={isEditMode} initialValue="Telefon" /></p>
                      <EditableField as="p" className="text-gray-600" isEditable={isEditMode} initialValue="+36 1 234 5678" />
                    </div>
                  </div>
                   <div>
                      <p className="font-medium mb-1"><EditableField as="span" isEditable={isEditMode} initialValue="Nyitvatartási idő" /></p>
                       <div className="space-y-1 text-gray-600">
                        <p>Kedd - Péntek: 10:00 - 18:00</p>
                        <p>Szombat: 11:00 - 16:00</p>
                        <p>Vasárnap - Hétfő: Zárva</p>
                      </div>
                  </div>
                </div>

<form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="sr-only">Teljes név</label>
                    <Input id="name" name="name" type="text" placeholder="Teljes név" required />
                  </div>

                  <div>
                    <label htmlFor="email" className="sr-only">E-mail cím</label>
                    <Input id="email" name="email" type="email" placeholder="E-mail cím" required />
                  </div>

                  <div>
                     <label htmlFor="subject" className="sr-only">Tárgy</label>
                    <Input id="subject" name="subject" type="text" placeholder="Tárgy" required />
                  </div>

                  <div>
                    <label htmlFor="message" className="sr-only">Üzenet</label>
                    <Textarea id="message" name="message" placeholder="Üzenet" rows={6} required />
                  </div>

                  <Button type="submit" className="w-full" style={{
                  borderRadius: '8px 8px 24px 24px'
                }}>
                    Küldés
                  </Button>
                </form>
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8,
              delay: 0.4
            }}>
                <div className="relative overflow-hidden" style={{
                borderRadius: '24px 24px 36px 36px'
              }}>
                    <img alt="Map and photos of K6 studio location" src="/images/etc/K6-img-kapcsolat-img.jpg" />
                </div>
              </motion.div>

            </div>
          </div>
        </main>
      </div>
    </>;
};
export default ContactPage;