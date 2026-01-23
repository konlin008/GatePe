import { roleApi } from "@/apis/auth.api";
import {
  eventDetailsApi,
  getEventsByLocationApi,
  requestAsOrganizerApi,
} from "@/apis/user.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetEventsByLocation = (location) => {
  return useQuery({
    queryKey: ["events-by-location", location],
    queryFn: () => getEventsByLocationApi(location),
  });
};
export const useEventDetails = (id) => {
  return useQuery({
    queryKey: ["event-details", id],
    queryFn: () => eventDetailsApi(id),
  });
};
export const useRole = (loggedin) => {
  return useQuery({
    queryKey: ["role", loggedin],
    queryFn: roleApi,
    enabled: loggedin,
  });
};
export const useReqAsOrganizer = () => {
  return useMutation({
    mutationFn: requestAsOrganizerApi,
  });
};
