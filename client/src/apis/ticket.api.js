import api from "axios";
export const ticketDetailsForGateMate = async ({ scannedCode, eventId }) => {
  const res = await api.get(
    `ticket/ticketticketdetails-gateMate/${scannedCode}/${eventId}`,
  );
  return res.data;
};
