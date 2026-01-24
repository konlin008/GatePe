import { createNewEventApi, getAllListedEventsApi } from "@/apis/organizer.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllListedEvents = () => {
  return useQuery({
    queryKey: ["getAllListedEventsApi"],
    queryFn: getAllListedEventsApi,
  });
};
export const useCreateNewEvent = () => {
  return useMutation({
    mutationFn: createNewEventApi,
  });
};
