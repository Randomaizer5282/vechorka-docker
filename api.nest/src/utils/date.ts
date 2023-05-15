import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const formatISODate = (value: string) => {
  return dayjs(value).format('YYYY-MM-DD');
};

export const formatISOTime = (value: string) => {
  return dayjs(value).format('H:mm');
};

export const formatISODateGmt = (value: string) => {
  return dayjs(value).format('ddd, D MMM YYYY HH:mm:ss ZZ');
};
