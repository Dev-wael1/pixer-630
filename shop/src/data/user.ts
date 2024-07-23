import type { User } from '@/types';
import useAuth from '@/components/auth/use-auth';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import client from './client';
import { API_ENDPOINTS } from './client/endpoints';
import Cookies from 'js-cookie';
import { AUTH_CRED, NEWSLETTER_POPUP_MODAL_KEY, TOKEN } from '@/lib/constants';

export function useMe() {
  const { isAuthorized } = useAuth();
  const { data, isLoading, error } = useQuery<User, Error>(
    [API_ENDPOINTS.USERS_ME],
    client.users.me,
    {
      enabled: isAuthorized,
    },
  );
  return {
    me: data,
    isLoading,
    error,
    isAuthorized,
  };
}

export function useLogout() {
  const { unauthorize } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(client.users.logout, {
    onSuccess: (data) => {
      unauthorize();
      queryClient.resetQueries(API_ENDPOINTS.USERS_ME);
      if (data) {
        Cookies.remove(NEWSLETTER_POPUP_MODAL_KEY);
        Cookies.remove(AUTH_CRED);
        Cookies.remove(TOKEN);
      }
    },
  });
}
