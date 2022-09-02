import { format } from 'date-fns';

import Result from '../types/Result';
import MetadataItem from './MetadataItem';

const ResultCard = ({
  content_type,
  title,
  url,
  field_project_image_url,
  field_project_image_alt,
  field_district_image_url,
  field_district_image_alt,
  project_execution_schedule,
  project_plan_schedule,
  field_project_district_name,
  field_project_theme_name,
  field_district_sub_districts_name
}: Result) => {

  const siteUrl = "https://helfi-kymp.docker.so"

  let imageUrl = field_project_image_url ? field_project_image_url[0] : ''
  imageUrl = field_district_image_url ? field_district_image_url[0] : imageUrl

  let imageAlt = field_project_image_alt ? field_project_image_alt[0] : ''
  imageAlt = field_district_image_alt ? field_district_image_alt[0] : imageAlt

  return (
    <article className="project-teaser node--type-project" style={{border: "1px solid"}}>
      <div className="project-teaser__image">
        { imageUrl ? (
          <img src={`${siteUrl}${imageUrl}`} width="800" height="533" alt={imageAlt[0]} loading="lazy" typeof="foaf:Image" />
        ) : (
        <div className="image-placeholder">
          <span className="hel-icon hel-icon--home-smoke"></span>
        </div>
        )}
      </div>

      <div className="project-teaser__data">
        <div className="content-tags content-tags--content-type">
          <div className="content-tags__tags content-tags__tags--static">
            <span className="content-tags__tags__tag">{content_type}</span>
          </div>
        </div>

        <a href={`${siteUrl}${url}`} className="project-teaser__link" rel="bookmark" hrefLang="fi">
          <h3 className="content-card__title" id="toolo-hanke"><span>{title}</span></h3>
        </a>

        { project_execution_schedule &&
          <MetadataItem icon="calendar" label="Arvioitu aikataulu" projectExecutionSchedule={project_execution_schedule} projectPlanSchedule={project_plan_schedule} />
        }

        {field_project_district_name && 
          <MetadataItem icon="location" label="Sijainti" items={field_project_district_name} />
        }

        {field_district_sub_districts_name && 
          <MetadataItem icon="location" label="Alueet" items={field_district_sub_districts_name} />
        }

        {field_project_theme_name && 
          <MetadataItem icon="locate" label="Teema" items={field_project_theme_name} />
        }
      </div>
    </article>
  );
};

export default ResultCard;
