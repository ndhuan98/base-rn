import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from 'src/apis/queries';

export const useGetUserProfile = (id: string | number, enabled: boolean = true) => {
  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery(['userProfile', id], () => getUserProfile(id), {
    refetchOnWindowFocus: true,
    enabled: enabled || !!id,
  });

  return { userProfile: data, isLoading, refetch };
};
