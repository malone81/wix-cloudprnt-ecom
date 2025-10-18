import { Permissions, webMethod } from "wix-web-module";
import wixSiteBackend from "wix-site-backend";

export const getLocale = webMethod(Permissions.Anyone, () => {
  return wixSiteBackend.generalInfo.getLocale();
});

export const getTimeZone = webMethod(Permissions.Anyone, () => {
  return wixSiteBackend.generalInfo.getTimeZone();
});

export async function getLocalOrderTime(date) {
  if (!date) return "-";
  const locale = await getLocale();
  const timeZone = await getTimeZone();
  const utcDate = new Date(date);
  const options = {
    timeZone,
    day: "2-digit",

    year: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  };

  const localDateTime = new Intl.DateTimeFormat(`${locale.languageCode}-${locale.country}`, options).format(utcDate);
  return localDateTime;
}
