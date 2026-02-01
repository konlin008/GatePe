import {
  createNewEventApi,
  getAllListedEventsApi,
  getEventDeatilsApi,
  updateEventDetailsApi,
} from "@/apis/organizer.api";
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
export const useGetEventDetails = (id) => {
  return useQuery({
    queryKey: ["getEventDetails", id],
    queryFn: () => getEventDeatilsApi(id),
  });
};
export const useUpdateEventDetails = () => {
  return useMutation({
    mutationFn: updateEventDetailsApi,
  });
};
export const useAssignGateMate = ()=>{
  return useMutation({
    mutationFn:
  })
}