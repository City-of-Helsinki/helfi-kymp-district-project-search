import { format } from 'date-fns';

interface MetadataItemProps {
  icon: string;
  label: string;
  items?: Array<string>;
  projectExecutionSchedule?: Array<number>;
  projectPlanSchedule?: Array<number>;
}

export const MetadataItem = (props: MetadataItemProps): JSX.Element => {
  const { icon, label, items, projectExecutionSchedule, projectPlanSchedule } = props;

  const getVisibleTime = (timestamp: number) => {
    return format(new Date(Number(timestamp) * 1000), 'M/Y');
  };

  const getHtmlTime = (timestamp: number) => {
    const published = new Date(Number(timestamp) * 1000);
    return `${format(published, 'Y-MM-dd')}T${format(published, 'HH:mm')}Z`;
  };

  const getTime = (label: any, time: any) => {
    <>
      <span className="label">Suunnittelu</span>
      <time dateTime={getHtmlTime(time)}>{getVisibleTime(time)}</time>
    </>
  }


  return (
    <div className="metadata__item">
      <span className={`hel-icon hel-icon--${icon}`} aria-hidden="true"></span>
      <div>
        <span className="metadata__item-label">{label}</span>
          <span className="metadata__item-content">
          {projectPlanSchedule && projectPlanSchedule.map((item: any, i: number) => (
            <>
              {i === 0 && <span className="label">Suunnittelu</span>}
              <time dateTime={getHtmlTime(item)} key={`${item}-${i}`}>{getVisibleTime(item)} </time>
            </>
          ))}

          {projectExecutionSchedule && projectExecutionSchedule.map((item: any, i: number) => (
            <>
              {i === 0 && <span className="label">Toteutus</span>}
              <time dateTime={getHtmlTime(item)} key={`${item}-${i}`}>{getVisibleTime(item)} </time>
            </>
          ))}

          {items && items.map((item: any, i: number) => (
            <span className="label" key={`${item}-${i}`}>{item}</span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default MetadataItem;
