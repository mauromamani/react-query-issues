import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../../hooks/useIssues';

export const ListView = () => {
  const [state, setState] = useState<any>('');

  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);
  const { issuesQuery, page, nextPage, prevPage } = useIssues({
    state,
    labels: selectedLabel,
  });

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
            issues={issuesQuery.data}
            state={state}
            onStateChanged={(newState: any) => setState(newState)}
          />
        )}
        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button
            className='btn btn-outline-primary'
            onClick={prevPage}
            disabled={issuesQuery.isFetching}
          >
            Prev
          </button>
          <span>{page}</span>
          <button
            className='btn btn-outline-primary'
            onClick={nextPage}
            disabled={issuesQuery.isFetching}
          >
            Next
          </button>
        </div>
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
