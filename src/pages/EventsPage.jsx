import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { fetchEventsFromSheet } from "@/utils/fetchEvents";
import { eventsData as staticEvents } from "@/data/staticEventsData";
import { Calendar, Clock, MapPin } from "lucide-react";

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const urlPattern = /(https?:\/\/[^\s]+)/g;

function renderDescription(text) {
  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, lineIndex) => {
    const parts = line.split(urlPattern);

    return (
      <React.Fragment key={lineIndex}>
        {parts.map((part, i) => {
          // Ha a rész egy teljes URL, akkor legyen belőle link
          if (/^https?:\/\/[^\s]+$/.test(part)) {
            return (
              <a
                key={i}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                {part}
              </a>
            );
          }

          // Egyébként sima szöveg
          return <span key={i}>{part}</span>;
        })}
        {/* sortörés a következő sor előtt */}
        {lineIndex < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}


const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function load() {
      const sheetEvents = await fetchEventsFromSheet();
      setEvents(sheetEvents || staticEvents);
    }
    load();
  }, []);

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-medium mb-16">Események</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
  {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-[36px] shadow-sm overflow-hidden"
            >
              {event.image && (
                <div className="aspect-[4/3] overflow-hidden rounded-[36px_36px_0px_0px]">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-8">
                <h2 className="text-3xl font-medium mb-6">{event.title}</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>

                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
  {renderDescription(event.description)}
</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsPage;
