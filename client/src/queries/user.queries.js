import { getEventsByLocationApi } from "@/apis/user.api";
import { useQuery } from "@tanstack/react-query";

export const useGetEventsByLocation = (location) => {
  return useQuery({
    queryKey: ["events-by-location", location],
    queryFn: () => getEventsByLocationApi(location),
  });
};
