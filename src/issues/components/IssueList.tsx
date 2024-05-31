import { IssueItem } from './IssueItem';

export const IssueList = ({ issues, state, onStateChanged }: any) => {
  return (
    <div className='card border-white'>
      <div className='card-header bg-dark'>
        <ul className='nav nav-pills card-header-pills'>
          <li className='nav-item'>
            <a
              className={`nav-link ${!state ? 'active' : ''}`}
              onClick={() => onStateChanged()}
            >
              All
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={`nav-link ${state === 'open' ? 'active' : ''}`}
              onClick={() => onStateChanged('open')}
            >
              Open
            </a>
          </li>
          <li className='nav-item'>
            <a
              className={`nav-link ${state === 'closed' ? 'active' : ''}`}
              onClick={() => onStateChanged('closed')}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className='card-body text-dark'>
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};
