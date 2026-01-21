import api from "./axios";

export const getEventsByLocationApi = async (location) => {
  return api.get(`user/getEventsByCatgory?location=${location}`);
};
