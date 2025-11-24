import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import EditableField from "@/components/EditableField";
import { useEditMode } from "@/hooks/useEditMode";
import { eventsData as staticEvents } from "@/data/staticEventsData";
import { fetchEventsFromSheet } from "@/utils/fetchEvents";

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const UpcomingEvents = () => {
  const isEditMode = useEditMode();
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    async function load() {
      const sheetEvents = await fetchEventsFromSheet();
      const all = sheetEvents || staticEvents;

      const now = new Date();
      now.setHours(0, 0, 0, 0);

      // jövőbeli események időrendben
      let upcoming = all
        .filter((ev) => ev.date && new Date(ev.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 2);

      // ha valamiért nem jön ki 2 darab (pl. dátum formátum gond),
      // essen vissza az első 2 eseményre
      if (upcoming.length === 0) {
        upcoming = all.slice(0, 2);
      }

      setUpcomingEvents(upcoming);
    }

    load();
  }, []);

  if (upcomingEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-24">
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
            initialValue="Közelgő események"
          />
        </motion.div>

        {/* KÉT HASÁBOS GRID */}
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-8">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to="/events"
                className="group block bg-white p-0 transition-colors hover:bg-[#E0DCCB]"
                style={{ borderRadius: "24px 24px 36px 36px" }}
              >
                {/* KÉP FELÜL, TELJES SZÉLESSÉGEN, PADDING NÉLKÜL */}
                {event.image && (
                  <div className="aspect-[4/3] overflow-hidden rounded-[24px_24px_0px_0px]">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* TARTALOM – UGYANÚGY, MINT RÉGEBBEN */}
                <div className="p-8">
                  <EditableField
                    as="h3"
                    className="text-2xl font-medium mb-4"
                    isEditable={isEditMode}
                    initialValue={event.title}
                  />

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.date)}</span>

                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>

                  <EditableField
                    as="p"
                    className="text-gray-700 leading-relaxed mb-6 line-clamp-3 whitespace-pre-line"
                    isEditable={isEditMode}
                    initialValue={event.description}
                  />

                  <div className="flex items-center gap-2 text-black font-medium">
                    <span>Részletek</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
