import IndexFields from '../enum/IndexFields';
import SearchComponents from '../enum/SearchComponents';

export const ComponentMap = {
  [SearchComponents.TITLE]: `${IndexFields.TITLE}.keyword`,
  [SearchComponents.DISTRICTS]: `${IndexFields.FIELD_PROJECT_DISTRICT_TITLE}.keyword`,
  [SearchComponents.THEME]: `${IndexFields.FIELD_PROJECT_THEME_NAME}.keyword`,
  [SearchComponents.PHASE]: `${IndexFields.FIELD_PROJECT_PHASE_NAME}.keyword`,
  [SearchComponents.TYPE]: `${IndexFields.FIELD_PROJECT_TYPE_NAME}.keyword`
};

export const capitalize = (s: string) => {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}
