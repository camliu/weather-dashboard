import { format } from 'date-fns';

export const formatTime = (unixTimestamp: number): string =>
  format(new Date(unixTimestamp * 1000), 'h:mm a');

export const formatDate = (unixTimestamp: number): string =>
  format(new Date(unixTimestamp * 1000), 'yyyy-MM-dd');
