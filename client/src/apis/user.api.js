import api from "./axios";

export const getEventsByLocationApi = async (location) => {
  return api.get(`user/getEventsByCatgory?location=${location}`);
};
export const eventDetailsApi = async (id) => {
  return api.get(`user/${id}`);
};
export const requestAsOrganizerApi = async (payload) => {
  return api.post("user/request-as-organizer", payload);
};
