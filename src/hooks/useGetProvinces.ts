import { useQuery } from '@tanstack/react-query';
import { getAllProvinces } from 'src/apis/queries';

export const useGetProvince = () => {
  const { isLoading, data } = useQuery(['provinces'], () => getAllProvinces());

  return { provinces: data, provinceLoading: isLoading };
};
