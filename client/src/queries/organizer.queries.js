import {
  assignGateMateApi,
  createNewEventApi,
  getAllGateMatesApi,
  getAllListedEventsApi,
  getEventDeatilsApi,
  removeGateMateApi,
  updateEventDetailsApi,
} from "@/apis/organizer.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { eventNames } from "node:process";

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
export const useAssignGateMate = () => {
  return useMutation({
    mutationFn: assignGateMateApi,
  });
};
export const useAllgateMates = (eventId) => {
  return useQuery({
    queryKey: ["allGateMates", eventId],
    queryFn: () => getAllGateMatesApi(eventId),
  });
};
export const useRemoveGateMates = () => {
  return useMutation({
    mutationFn: removeGateMateApi,
  });
};
