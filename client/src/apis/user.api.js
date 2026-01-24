import api from "./axios";

export const getEventsByCityApi = async (city) => {
  return api.get(`user/get-events-by-city?city=${city}`);
};
export const eventDetailsApi = async (id) => {
  return api.get(`user/${id}`);
};
export const requestAsOrganizerApi = async (payload) => {
  return api.post("user/request-as-organizer", payload);
};
