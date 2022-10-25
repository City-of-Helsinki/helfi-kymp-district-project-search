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

  const getVisibleTime = (dateString: number): string => {
    return format(new Date(dateString), 'M/Y');
  };
  
  const getHtmlTime = (dateString: number): string => {
    const published = new Date(dateString);
    return `${format(published, 'Y-MM-dd')}T${format(published, 'HH:mm')}Z`;
  };
  
  const getTimeItem = (dateStrings: any): JSX.Element => (
    dateStrings.map((dateString: number, i: number) => (
      <time dateTime={getHtmlTime(dateString)} key={`${dateString}-${i}`}> {i !== 0 && "-"} {getVisibleTime(dateString)}</time>
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
              {Drupal.t('planning')}
              {getTimeItem(projectPlanSchedule)}
            </span>
          }

          {projectExecutionSchedule &&
            <span className="metadata__item--schedule">
              {Drupal.t('execution')}
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
