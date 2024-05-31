import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../../hooks/useIssues';
import { useIssuesInfinite } from '../../hooks/useIssuesInfinite';

export const ListViewInfinite = () => {
  const [state, setState] = useState<any>('');

  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);
  const { issuesQuery } = useIssuesInfinite({
    state,
    labels: selectedLabel,
  });

  console.log(issuesQuery.data);

  const onLabelChange = (label: string) => {
    if (selectedLabel.includes(label)) {
      setSelectedLabel(selectedLabel.filter((l) => l !== label));
    } else {
      setSelectedLabel([...selectedLabel, label]);
    }
  };

  return (
    <div className='row mt-5'>
      <div className='col-8'>
        {issuesQuery.isLoading ? (
          <div>Loading...</div>
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onStateChanged={(newState: any) => setState(newState)}
          />
        )}

        <button
          onClick={() => issuesQuery.fetchNextPage()}
          disabled={!issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage}
        >
          {' '}
          {issuesQuery.isFetchingNextPage
            ? 'Loading more...'
            : issuesQuery.hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>

      <div className='col-4'>
        <LabelPicker
          selectedLabel={selectedLabel}
          onChange={(label: any) => onLabelChange(label)}
        />
      </div>
    </div>
  );
};
