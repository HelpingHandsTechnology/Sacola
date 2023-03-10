import * as Burnt from 'burnt';
import { throttle } from '../../utils';

export const errorToast = throttle(
  ({ title, message }: { title: string; message: string }) =>
    Burnt.toast({
      title,
      message,
      preset: 'error',
      duration: 5,
    }),
  5000,
);
