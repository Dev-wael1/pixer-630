import { useMutation, useQueryClient } from 'react-query';
import client from '@/data/client';
import toast from 'react-hot-toast';

export function useContactUs() {
  const { mutate, isLoading, isSuccess } = useMutation(
    client.settings.contactUs,
    {
      onSuccess: () => {
        toast.success('Successfully sent your message');
      },
      onError: (res) => {
        toast.error('Ops! something went wrong');
      },
    }
  );

  return { mutate, isLoading, isSuccess };
}
