import api from "./axios";

export const getAllListedEventsApi = async () => {
  const res = await api.get("org/get_all_events");
  return res.data;
};
export const createNewEventApi = async (payload) => {
  const res = await api.post("org/create_new_event", payload);
  return res.data;
};
export const getEventDeatilsApi = async (eventId) => {
  const res = await api.get(`org/get-event-details/${eventId}`);
  return res.data;
};
export const updateEventDetailsApi = async ({ id, data }) => {
  const res = await api.put(`org/update-event/${id}`, data);
  return res.data;
};
export const assignGateMateApi = async (payload) => {
  const res = await api.post("org/assignGateMate", payload);
  return res.data;
};
export const getAllGateMatesApi = async (eventId) => {
  const res = await api.get(`org/getAllGateMates/${eventId}`);
  return res.data;
};
export const removeGateMateApi = async ({ eventId, gateMateId }) => {
  const res = await api.delete(`org/events/${eventId}/gatemates/${gateMateId}`);
  return res.data;
};
export const availableGateMateApi = async () => {
  const res = await api.get(`org/available-gateMate`);
  return res.data;
};
export const addExistingGateMate = async (payload) => {
  const res = await api.patch("org/add-existing-mate-to-event", payload);
  return res.data;
};
