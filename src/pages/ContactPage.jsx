import React from 'react';
import Seo from '@/components/Seo';
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
    window.location.href = `mailto:faficeramics@gmail.com?subject=${encodeURIComponent(
      finalSubject
    )}&body=${encodeURIComponent(body)}`;

    // opcionális visszajelzés
    toast({
      title: 'E-mail előkészítve',
      description: 'Megnyitottuk az e-mail kliensedet, itt tudod elküldeni az üzenetet.',
    });
  };

  return <>
      <Seo title="Kapcsolat" description="A K6 Alkotó Műhelyház Szentendrén, a Kőzúzó u. 6. alatt található. Látogatás előre megbeszélt időpontban, írj vagy hívj minket." />

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
                      <EditableField as="a" href="info@k6alkotohaz.hu" className="text-gray-600 hover:text-gray-900" isEditable={isEditMode} initialValue="info@k6alkotohaz.hu" />
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium mb-1"><EditableField as="span" isEditable={isEditMode} initialValue="Telefon" /></p>
                      <EditableField as="p" className="text-gray-600" isEditable={isEditMode} initialValue="+3620 441 1458" />
                    </div>
                  </div>
                   <div>
                      <p className="font-medium mb-1"><EditableField as="span" isEditable={isEditMode} initialValue="Nyitvatartás:" /></p>
                       <div className="space-y-1 text-gray-600">
                        előre megbeszélt időpontban
                        
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
                <div className="relative overflow-hidden bg-[#ECE8D8] aspect-[4/5] md:aspect-[491/540]" style={{
                borderRadius: '24px 24px 36px 36px'
              }}>
                  <iframe
                    title="K6 Alkotó Műhelyház térképen"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1800!2d19.0676144!3d47.6600239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741d795465770f7%3A0x2e1e3e1587afa50a!2sK6%20Alkot%C3%B3%20M%C5%B1helyh%C3%A1z!5e0!3m2!1shu!2shu!4v1762940000000!5m2!1shu!2shu"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <a href="https://maps.app.goo.gl/jj7rbmm9wLy7W6518" target="_blank" rel="noopener" className="inline-block mt-3 text-sm text-gray-600 underline underline-offset-2 hover:text-gray-900">
                  A K6 Alkotó Műhelyház a Google Térképen
                </a>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <img alt="A K6 műhelyház a Kőzúzó utca felől" src="/images/etc/k6-kapcsolat-haz.jpg" loading="lazy" className="w-full aspect-[23/25] object-cover" style={{ borderRadius: '24px 24px 36px 36px' }} />
                  <img alt="A K6 műhelyház épülete az utcáról" src="/images/etc/k6-kapcsolat-utca.jpg" loading="lazy" className="w-full aspect-[23/25] object-cover" style={{ borderRadius: '24px 24px 36px 36px' }} />
                </div>
              </motion.div>

            </div>
          </div>
        </main>
      </div>
    </>;
};
export default ContactPage;