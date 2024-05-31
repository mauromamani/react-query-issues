import { useInfiniteQuery } from '@tanstack/react-query';
import { getIssuesInfiniteApi } from '../api/github';

export const useIssuesInfinite = ({ state, labels }: any) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', { state, labels }],
    queryFn: (data) => getIssuesInfiniteApi(data), // Add queryFn property
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return;

      return pages.length + 1;
    },
  });

  return {
    issuesQuery,
  };
};
