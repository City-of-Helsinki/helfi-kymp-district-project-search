import Result from '../../types/Result';
import MetadataItem from './MetadataItem';

const ResultCard = ({
  content_type,
  title_for_ui,
  url,
  project_image_absolute_url,
  field_project_image_alt,
  field_project_image_width,
  field_project_image_height,
  district_image_absolute_url,
  field_district_image_alt,
  field_district_image_width,
  field_district_image_height,
  project_execution_schedule,
  project_plan_schedule,
  field_project_district_title_for_ui,
  field_project_external_website,
  field_project_theme_name,
  field_district_subdistricts_title_for_ui
}: Result) => {
  const articleClass = content_type[0] === 'project' ? 'project-teaser node--type-project' : 'district-teaser node--type-district';
  const tagBgColor = content_type[0] === 'project' ? 'content-tags__tags__tag--gold' : 'content-tags__tags__tag--coat-of-arms';
  const linkIconClass = field_project_external_website ? 'hel-icon--link-external' : 'hel-icon--arrow-right';
  const linkUrl = field_project_external_website ? field_project_external_website[0] : `${url}`;
  let imageUrl = project_image_absolute_url ? project_image_absolute_url[0] : ''
  imageUrl = district_image_absolute_url ? district_image_absolute_url[0] : imageUrl
  let imageAlt = field_project_image_alt && field_project_image_alt?.[0] !== '""' ? field_project_image_alt[0] : ''
  imageAlt = field_district_image_alt && field_district_image_alt?.[0] !== '""' ? field_district_image_alt[0] : imageAlt
  let imageWidth = field_project_image_width ? field_project_image_width[0] : null
  imageWidth = field_district_image_width ? field_district_image_width[0] : imageWidth
  let imageHeight = field_project_image_height ? field_project_image_height[0] : null
  imageHeight = field_district_image_height ? field_district_image_height[0] : imageHeight

  return (
    <article about={url[0]} className={articleClass}>
      <div className={`${content_type[0]}-teaser__image`}>
        { imageUrl ? (
          <img src={`${imageUrl}`} alt={imageAlt} {...imageWidth && { 'width': imageWidth }} {...imageHeight && { 'height': imageHeight }} loading="lazy" typeof="foaf:Image" />
        ) : (
        <div className="image-placeholder">
          <span className="hel-icon hel-icon--home-smoke"></span>
        </div>
        )}
      </div>

      <div className={`${content_type[0]}-teaser__data`}>
        <section className="content-tags" aria-label={Drupal.t('Tags')}>
          <ul className="content-tags__tags content-tags__tags--static">
            <li className={`content-tags__tags__tag ${tagBgColor}`}>
              { content_type[0] === 'district' && <span>{Drupal.t('District', {}, { context: 'District and project search' })}</span> }
              { content_type[0] === 'project' && <span>{Drupal.t('Project', {}, { context: 'District and project search' })}</span> }
            </li>
          </ul>
        </section>

        <a href={linkUrl} className={`${content_type[0]}-teaser__link`} {...field_project_external_website && {'data-is-external' : 'true'}} rel="bookmark">
          <h3 className="content-card__title"><span>{title_for_ui}</span></h3>
          {field_project_external_website && 
            <span className="link__type link__type--external" aria-label={`(${Drupal.t('Link leads to external service')})`}></span>
          }
        </a>

        { project_plan_schedule || project_execution_schedule ? 
          <MetadataItem icon="calendar" label={Drupal.t('Estimated schedule')} projectPlanSchedule={project_plan_schedule} projectExecutionSchedule={project_execution_schedule} />
        :
          null
        }

        {field_project_district_title_for_ui && 
          <MetadataItem icon="location" label={Drupal.t('Location')} items={field_project_district_title_for_ui} />
        }
        {field_district_subdistricts_title_for_ui && 
          <MetadataItem icon="location" label={Drupal.t('Districts')} items={field_district_subdistricts_title_for_ui} />
        }
        {field_project_theme_name && 
          <MetadataItem icon="locate" label={Drupal.t('Theme')} items={field_project_theme_name} />
        }
        
        <span className={`hel-icon ${linkIconClass}`} aria-hidden="true"></span>
      </div>
    </article>
  );
};

export default ResultCard;
