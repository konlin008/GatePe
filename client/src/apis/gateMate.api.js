import api from "./axios";

export const assignedEventsApi = async () => {
  const res = await api.get("gateMate/assignedEvents");
  return res.data;
};
export const eventDetails = async (eventId) => {
  const res = await api.get(`gateMate/event-details/${eventId}`);
  return res.data;
};
