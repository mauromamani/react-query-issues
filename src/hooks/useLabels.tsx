import { useQuery } from '@tanstack/react-query';
import { getLabels } from '../api/github';

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // se carga cada hora
    placeholderData: [
      { id: 1, name: 'PLACEHOLDER', color: '000000' },
      { id: 2, name: 'PLACEHOLDER', color: 'f2f2f2' },
    ],
  });

  return {
    labelsQuery,
  };
};
