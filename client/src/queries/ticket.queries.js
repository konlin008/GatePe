import { ticketDetailsForGateMate } from "@/apis/ticket.api";
import { useQuery } from "@tanstack/react-query";

export const useGetTicketDetails = ({ scannedCode, eventId }) => {
  return useQuery({
    queryKey: ["eventDetailsForGateMate"],
    queryFn: () => ticketDetailsForGateMate({ scannedCode, eventId }),
    enabled: Boolean(scannedCode && eventId),
  });
};
