import { useQuery } from '@tanstack/react-query';
import { getIssueApi, getIssueCommentApi } from '../api/github';

export const useIssue = (id: number) => {
  const issueQuery = useQuery({
    queryKey: ['issue', id],
    queryFn: () => getIssueApi(id),
  });

  const commentsQuery = useQuery({
    queryKey: ['issue', id, 'comments'],
    queryFn: () => getIssueCommentApi(issueQuery.data!.number),
    enabled: issueQuery.data !== undefined,
  });

  return {
    issueQuery,
    commentsQuery,
  };
};
