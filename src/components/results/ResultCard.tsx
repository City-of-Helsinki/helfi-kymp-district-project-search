import Result from '../../types/Result';
import MetadataItem from './MetadataItem';
import { capitalize } from '../../helpers/helpers';

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
  field_project_external_website,
  field_project_theme_name,
  field_district_sub_districts_name
}: Result) => {
  const articleClass = content_type[0] === 'project' ? 'project-teaser node--type-project' : 'district-teaser node--type-district';
  const tagBgColor = content_type[0] === 'project' ? 'content-tags__tags__tag--gold' : 'content-tags__tags__tag--coat-of-arms';
  const linkIconClass = field_project_external_website ? 'hel-icon--link-external' : 'hel-icon--arrow-right';
  const linkUrl = field_project_external_website ? field_project_external_website[0] : `${url}`;
  let imageUrl = field_project_image_url ? field_project_image_url[0] : ''
  imageUrl = field_district_image_url ? field_district_image_url[0] : imageUrl
  let imageAlt = field_project_image_alt ? field_project_image_alt[0] : ''
  imageAlt = field_district_image_alt ? field_district_image_alt[0] : imageAlt

  return (
    <article about={url[0]} className={articleClass}>
      <div className={`${content_type[0]}-teaser__image`}>
        { imageUrl ? (
          <img src={`${imageUrl}`} alt={imageAlt} loading="lazy" typeof="foaf:Image" />
        ) : (
        <div className="image-placeholder">
          <span className="hel-icon hel-icon--home-smoke"></span>
        </div>
        )}
      </div>

      <div className={`${content_type[0]}-teaser__data`}>
        <section className="content-tags" aria-label={Drupal.t('Tags', {}, { context: 'District and project search tags' })}>
          <ul className="content-tags__tags content-tags__tags--static">
            <li className={`content-tags__tags__tag ${tagBgColor}`}>
              <span>{Drupal.t(capitalize(content_type[0]), {}, { context: 'District and project search content type' })}</span>
            </li>
          </ul>
        </section>

        <a href={linkUrl} className={`${content_type[0]}-teaser__link`} {...field_project_external_website && {'data-is-external' : 'true'}} rel="bookmark">
          <h3 className="content-card__title"><span>{capitalize(title[0])}</span></h3>
          {field_project_external_website && 
            <span className="link__type link__type--external" aria-label={`(${Drupal.t('Link leads to external service', {}, { context: 'District and project search external link' })})`}></span>
          }
        </a>

        { project_plan_schedule || project_execution_schedule ? 
          <MetadataItem icon="calendar" label={Drupal.t('Estimated schedule', {}, { context: 'District and project search Estimated schedule label' })} projectPlanSchedule={project_plan_schedule} projectExecutionSchedule={project_execution_schedule} />
        :
          null
        }

        {field_project_district_name && 
          <MetadataItem icon="location" label={Drupal.t('Location', {}, { context: 'District and project search location label' })} items={field_project_district_name} />
        }
        {field_district_sub_districts_name && 
          <MetadataItem icon="location" label={Drupal.t('Districts', {}, { context: 'District and project searchdistricts label' })} items={field_district_sub_districts_name} />
        }
        {field_project_theme_name && 
          <MetadataItem icon="locate" label={Drupal.t('Theme', {}, { context: 'District and project search theme label' })} items={field_project_theme_name} />
        }
        
        <span className={`hel-icon ${linkIconClass}`} aria-hidden="true"></span>
      </div>
    </article>
  );
};

export default ResultCard;
