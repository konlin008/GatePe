import api from "./axios";

export const getEventsByLocationApi = async (location) => {
  return api.get(`user/getEventsByCatgory?location=${location}`);
};
export const eventDetailsApi = async (id) => {
  return api.get(`user/${id}`);
};
