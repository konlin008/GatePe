import api from "./axios";

export const getAllListedEventsApi = async () => {
  const res = await api.get("org/get_all_events");
  return res.data;
};
export const createNewEventApi = async (payload) => {
  const res = await api.post("org/create_new_event", payload);
  return res.data;
};
