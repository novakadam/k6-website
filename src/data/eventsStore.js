import { v4 as uuidv4 } from 'uuid';

const EVENTS_STORAGE_KEY = 'k6_events';

const getEvents = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  const events = localStorage.getItem(EVENTS_STORAGE_KEY);
  return events ? JSON.parse(events) : [];
};

const saveEvents = (events) => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
};

const addEvent = (newEvent) => {
  const events = getEvents();
  const eventWithId = { id: uuidv4(), ...newEvent };
  events.push(eventWithId);
  saveEvents(events);
  return eventWithId;
};

const updateEvent = (id, updatedEvent) => {
  const events = getEvents();
  const index = events.findIndex(event => event.id === id);
  if (index !== -1) {
    events[index] = { ...events[index], ...updatedEvent };
    saveEvents(events);
    return events[index];
  }
  return null;
};

const deleteEvent = (id) => {
  let events = getEvents();
  const initialLength = events.length;
  events = events.filter(event => event.id !== id);
  saveEvents(events);
  return events.length < initialLength; // true if an event was deleted
};

export { getEvents, addEvent, updateEvent, deleteEvent };