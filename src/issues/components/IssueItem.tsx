import { useQueryClient } from '@tanstack/react-query';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getIssueApi, getIssueCommentApi } from '../../api/github';

export const IssueItem = ({ issue }: any) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onMouseEnterPrefetchData = () => {
    // prefetch de la data cuando se hace el onmouseenter
    console.log('Mouse entered');
    queryClient.prefetchQuery({
      queryKey: ['issue', issue.number],
      queryFn: () => getIssueApi(issue.number),
      staleTime: 1000 * 60 * 60,
    });

    queryClient.prefetchQuery({
      queryKey: ['issue', issue.number, 'comments'],
      queryFn: () => getIssueCommentApi(issue.number),
      staleTime: 1000 * 60 * 60,
    });
  };

  const onMouseEnterPresetData = () => {
    queryClient.setQueryData(['issue', issue.number], issue, {
      updatedAt: new Date().getTime() + 1000 * 60 * 60, // la info se va a mantener fresca hasta ...
    });
  };

  return (
    <div
      className='card mb-2 issue'
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      onMouseEnter={onMouseEnterPresetData}
    >
      <div className='card-body d-flex align-items-center'>
        {issue.state === 'open' ? (
          <FiInfo size={30} color='red' />
        ) : (
          <FiCheckCircle size={30} color='green' />
        )}

        <div className='d-flex flex-column flex-fill px-2'>
          <span>{issue.title}</span>
          <span className='issue-subinfo'>
            #{issue.number} opened 2 days ago by{' '}
            <span className='fw-bold'>{issue.user.login}</span>
            <div className=''>
              {issue.labels.map((label: any) => (
                <span
                  key={label.id}
                  className='badge bg-secondary text-light mx-1'
                >
                  {label.name}
                </span>
              ))}
            </div>
          </span>
        </div>

        <div className='d-flex align-items-center'>
          <img
            src={issue.user.avatar_url}
            alt='User Avatar'
            className='avatar'
          />
          <span className='px-2'>2</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
