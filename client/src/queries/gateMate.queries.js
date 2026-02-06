import { assignedEventsApi, eventDetails } from "@/apis/gateMate.api";
import { useQuery } from "@tanstack/react-query";

export const useAssignedEvents = () => {
  return useQuery({
    queryKey: ["assignedEvents"],
    queryFn: assignedEventsApi,
  });
};
export const useEventDetails = (eventId) => {
  return useQuery({
    queryKey: ["eventDetails", eventId],
    queryFn: () => eventDetails(eventId),
  });
};
