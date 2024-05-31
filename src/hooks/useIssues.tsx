import { useQuery } from '@tanstack/react-query';
import { getIssuesApi } from '../api/github';
import { useEffect, useState } from 'react';

export const useIssues = ({ state, labels }: any) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [labels, state]);

  const issuesQuery = useQuery({
    queryKey: ['issues', { state, labels, page }],
    queryFn: () => getIssuesApi({ state, labels, page }),
  });

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) {
      return;
    }

    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return {
    issuesQuery,
    page: issuesQuery.isFetching ? 'Loading' : page,
    nextPage,
    prevPage,
  };
};
