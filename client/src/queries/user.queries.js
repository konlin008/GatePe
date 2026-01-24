import {
  eventDetailsApi,
  getEventsByCityApi,
  requestAsOrganizerApi,
} from "@/apis/user.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetEventsByCity = (city) => {
  return useQuery({
    queryKey: ["events-by-city", city],
    queryFn: () => getEventsByCityApi(city),
  });
};
export const useEventDetails = (id) => {
  return useQuery({
    queryKey: ["event-details", id],
    queryFn: () => eventDetailsApi(id),
  });
};

export const useReqAsOrganizer = () => {
  return useMutation({
    mutationFn: requestAsOrganizerApi,
  });
};
