import dayjs from "dayjs";
import "dayjs/locale/ru";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

export const formatISOToLocaleMonth = (value: number) => {
  return dayjs().month(value).locale("ru").format("MMMM");
};

export const formatISOToLocaleDateMonth = (value: string) => {
  return dayjs(value).locale("ru").format("D MMM");
};

export const formatDateToDateString = (value: string) => {
  const valueYear = dayjs(value).year();
  const nowYear = new Date().getFullYear();

  if (nowYear > valueYear) {
    return dayjs(value).locale("ru").format("D MMMM YYYY");
  }
  return dayjs(value).locale("ru").format("D MMMM");
};

export const formatDateGmt = (value: string) => {
  return dayjs(value).tz("Europe/Moscow").format("ddd, D MMM YYYY HH:mm:ss ZZ");
};
