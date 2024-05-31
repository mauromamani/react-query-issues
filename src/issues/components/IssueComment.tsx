import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  body: any;
}

export const IssueComment: FC<Props> = ({ body }) => {
  return (
    <div className='col-12'>
      <div className='card border-white mt-2'>
        <div className='card-header bg-dark'>
          <img
            src='https://avatars.githubusercontent.com/u/1933404?v=4'
            alt='User Avatar'
            className='avatar'
          />
          <span className='mx-2'>{body.user.login} commented</span>
        </div>
        <div className='card-body text-dark'>
          <ReactMarkdown>{body.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
