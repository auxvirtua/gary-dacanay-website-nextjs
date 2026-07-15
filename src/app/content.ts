import data from "./data.json";

export const bookingHref = `mailto:${data.email}?subject=${encodeURIComponent(
  data.booking.subject,
)}&body=${encodeURIComponent(data.booking.body)}`;

export const siteUrl = "https://garydacanay.com";
