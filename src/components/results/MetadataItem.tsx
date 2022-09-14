import { format } from 'date-fns';
import { capitalize } from '../../helpers/helpers';


interface MetadataItemProps {
  icon: string;
  label: string;
  items?: Array<string>;
  projectExecutionSchedule?: Array<number>;
  projectPlanSchedule?: Array<number>;
};

export const MetadataItem = (props: MetadataItemProps): JSX.Element => {
  const { icon, label, items, projectExecutionSchedule, projectPlanSchedule } = props;

  const getVisibleTime = (timestamp: number): string => {
    return format(new Date(Number(timestamp) * 1000), 'M/Y');
  };
  
  const getHtmlTime = (timestamp: number): string => {
    const published = new Date(Number(timestamp) * 1000);
    return `${format(published, 'Y-MM-dd')}T${format(published, 'HH:mm')}Z`;
  };
  
  const getTimeItem = (timestamps: any): JSX.Element => (
    timestamps.map((timestamp: number, i: number) => (
      <time dateTime={getHtmlTime(timestamp)} key={`${timestamp}-${i}`}> {i !== 0 && "-"} {getVisibleTime(timestamp)}</time>
    ))
  );

  return (
    <div className="metadata__item">
      <span className={`hel-icon hel-icon--${icon}`} aria-hidden="true"></span>
      <div>
        <span className="metadata__item-label">{label}</span>
          <span className="metadata__item-content">

          {projectPlanSchedule &&
            <span className="metadata__item--schedule metadata__item--schedule--plan-schedule">
              {Drupal.t('planning', {}, { context: 'District and project search schedule plan label' })}
              {getTimeItem(projectPlanSchedule)}
            </span>
          }

          {projectExecutionSchedule &&
            <span className="metadata__item--schedule">
              {Drupal.t('execution', {}, { context: 'District and project search schedule execution label' })}
              {getTimeItem(projectExecutionSchedule)}
            </span> 
          }

          {items && items.map((item: any, i: number) => (
            <span className="label" key={`${item}-${i}`}>{capitalize(item)}</span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default MetadataItem;
