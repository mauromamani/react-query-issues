import { useLabels } from '../../hooks/useLabels';

export const LabelPicker = ({ selectedLabel, onChange }: any) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {labelsQuery.data.map((label: any) => (
        <span
          key={label.id}
          className='badge rounded-pill m-1 label-picker'
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
            background: selectedLabel.includes(label.name) ? `white` : 'red',
          }}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
