// src/utils/fetchEvents.js

const SHEET_URL = "https://script.google.com/macros/s/AKfycbx8CIFjJK8iKlgARTmxqJOcBTfmdBeKeqmajjP2a65_B18mkx9C_Ogu_XUFQTAWw6Y41g/exec";

export async function fetchEventsFromSheet() {
  try {
    const response = await fetch(SHEET_URL, { cache: "no-store" });

    if (!response.ok) throw new Error("Sheet API error");

    const data = await response.json();

    // Expect: { events: [...], updatedAt: ... }
    if (!data.events) throw new Error("Malformed Sheet data");

    // Optional: Convert date strings → Date objects
    const events = data.events.map(ev => ({
      ...ev,
      date: ev.date ? ev.date.trim() : "",
      image: ev.image ? ev.image.trim() : null
    }));

    // Save backup for offline
    localStorage.setItem("sheetEvents", JSON.stringify(events));

    return events;
  } catch (error) {
    console.error("Google Sheet fetch error:", error);

    // Fallback to cache
    const cached = localStorage.getItem("sheetEvents");
    if (cached) {
      return JSON.parse(cached);
    }

    return null;
  }
}
