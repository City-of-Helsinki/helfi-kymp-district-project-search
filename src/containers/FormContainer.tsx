import { useRef, useState } from 'react';
import { ReactiveComponent } from '@appbaseio/reactivesearch';
import { TextInput, Accordion, IconLocation } from 'hds-react';

import Dropdown from '../components/form/Dropdown';
import SelectionsContainer from './SelectionsContainer';
import SearchComponents from '../enum/SearchComponents';
import SubmitButton from '../components/form/SubmitButton';
import IndexFields from '../enum/IndexFields';
import useLanguageQuery from '../hooks/useLanguageQuery';
import type OptionType from '../types/OptionType';
import { getQuery } from '../helpers/helpers';


type FormContainerProps = {
  initialState: {
    isParamsSet: boolean;
    title: string;
    districts: OptionType[];
    themes: OptionType[];
    phases: OptionType[];
    types: OptionType[];
  };
  searchState: any;
};

const FormContainer = ({ initialState, searchState }: FormContainerProps) => {
  const [title, setTitle] = useState<string>();
  const [isAccordionInitiallyOpen] = useState(initialState.isParamsSet);
  const languageFilter = useLanguageQuery();
  const submitButton = useRef<any>(null);
  const districtRef = useRef<any>(null);
  const themeRef = useRef<any>(null);
  const phaseRef = useRef<any>(null);
  const typeRef = useRef<any>(null);

  const clearSelection = (selection: OptionType, selectionType: string) => {
    const newValue = {...searchState}
    let ref;

    switch (selectionType) {
      case 'districts':
        ref = districtRef;
        break;
      case 'project_theme':
        ref = themeRef;
        break;
      case 'project_phase':
        ref = phaseRef;
        break;
      case 'project_type':
        ref = typeRef;
        break;
      default:
        break;
    }

    const index = newValue[selectionType].value?.findIndex((option: string) => {
      return option === selection.value;
    });

    if (index !== undefined) {
      newValue[selectionType].value.splice(index, 1);
    }

    ref?.current.setQuery({ value: newValue[selectionType].value });
    submitButton.current.setQuery(getQuery({searchState: newValue, languageFilter}));

  };

  const clearSelections = () => {
    if (submitButton && submitButton.current) {
      districtRef.current.setQuery({ query: null });
      themeRef.current.setQuery({ query: null });
      phaseRef.current.setQuery({ query: null });
      typeRef.current.setQuery({ query: null });
      submitButton.current.setQuery({ query: null, value: Number(searchState?.submit?.value) + 1 || 0 });
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="district-project-search-form__filters-container">
        <div className="district-project-search-form__filters">
          <ReactiveComponent
            componentId={SearchComponents.TITLE}
            defaultQuery={() => ({
              query: languageFilter
            })}
            render={({ setQuery }) => {
              return (
                <TextInput
                  id="district-or-project-name"
                  label={Drupal.t('Name of residential area or project', {}, { context: 'District and project search form label' })}
                  placeholder={Drupal.t('Use a search word such as "Pasila"', {}, { context: 'District and project search form label' })}
                  defaultValue={title}
                  onChange={({ target: { value } }) => {
                    setTitle(value);
                    setQuery({value});
                  }}
                />
              )}}
            URLParams={false}
          />
          <ReactiveComponent
            componentId={SearchComponents.DISTRICTS}
            ref={districtRef}
            defaultQuery={() => ({
              aggs: {
                [IndexFields.FIELD_PROJECT_DISTRICT_TITLE]: {
                  terms: {
                    field: `${IndexFields.FIELD_PROJECT_DISTRICT_TITLE}.keyword`,
                    size: 500,
                    order: { _key: 'asc' }
                  }
                },
                [IndexFields.TITLE]: {
                  terms: {
                    field: `${IndexFields.TITLE}.keyword`,
                    size: 500,
                    order: { _key: 'asc' }
                  }
                },
                [IndexFields.FIELD_DISTRICT_SUBDISTRICTS_TITLE]: {
                  terms: {
                    field: `${IndexFields.FIELD_DISTRICT_SUBDISTRICTS_TITLE}.keyword`,
                    size: 500,
                    order: { _key: 'asc' }
                  }
                },
                districts_for_filters: {
                  terms: {
                    field: `${IndexFields.DISTRICTS_FOR_FILTERS_DISTRICT_TITLE}.keyword`,
                    size: 500,
                    order: { _key: 'asc' }
                  }
                }
              },
              query: languageFilter
            })}
            render={({ setQuery }) => {
              return (
                <Dropdown
                  componentId={SearchComponents.DISTRICTS}
                  indexKey={IndexFields.FIELD_PROJECT_DISTRICT_TITLE}
                  filterKey="districts_for_filters"
                  icon={<IconLocation />}
                  label={Drupal.t('Select the residential area from the list', {}, { context: 'District and project search form label' })}
                  placeholder={Drupal.t('Select area', {}, { context: 'District and project search form label' })}
                  setQuery={setQuery}
                  searchState={searchState}
                />
              )}}
            URLParams={false}
          />
        </div>
        <Accordion
          className='district-project-search-form__additional-filters'
          size='s'
          initiallyOpen={isAccordionInitiallyOpen}
          headingLevel={4}
          heading={Drupal.t('Refine the project search', {}, { context: 'District and project search' })}
          language={window.drupalSettings.path.currentLanguage || 'fi'}
          theme={{
            '--header-font-size': 'var(--fontsize-heading-xxs)',
            '--header-line-height': 'var(--lineheight-s)',
          }}
        >
          <div className='district-project-search-form__filters'>
            <ReactiveComponent
              componentId={SearchComponents.THEME}
              ref={themeRef}
              defaultQuery={() => ({
                aggs: {
                  [IndexFields.FIELD_PROJECT_THEME_NAME]: {
                    terms: {
                      field: `${IndexFields.FIELD_PROJECT_THEME_NAME}.keyword`,
                      size: 500,
                      order: { _key: 'asc' }
                    }
                  },
                  project_theme_taxonomy_terms: {
                    terms: {
                      field: `${IndexFields.PROJECT_THEME_NAME}.keyword`,
                      size: 500,
                      order: { _key: 'asc' }
                    }
                  }
                },
                query: languageFilter,
              })}
              render={({ setQuery }) => {
                return (
                  <Dropdown
                    componentId={SearchComponents.THEME}
                    indexKey={IndexFields.FIELD_PROJECT_THEME_NAME}
                    filterKey="project_theme_taxonomy_terms"
                    label={Drupal.t('Project theme', {}, { context: 'District and project search form label' })}
                    placeholder={Drupal.t('All themes', {}, { context: 'District and project search form label' })}
                    setQuery={setQuery}
                    searchState={searchState}
                  />
                )}}
              URLParams={false}
            />
            <ReactiveComponent
              componentId={SearchComponents.PHASE}
              ref={phaseRef}
              defaultQuery={() => ({
                aggs: {
                  [IndexFields.FIELD_PROJECT_PHASE_NAME]: {
                    terms: {
                      field: `${IndexFields.FIELD_PROJECT_PHASE_NAME}.keyword`,
                      size: 500,
                      order: { _key: 'asc' }
                    }
                  },
                  project_phase_taxonomy_terms: {
                    terms: {
                      field: `${IndexFields.PROJECT_PHASE_NAME}.keyword`,
                      size: 500,
                      order: { _key: 'asc' }
                    }
                  }
                },
                query: languageFilter
              })}
              render={({ setQuery }) => {
                return (
                  <Dropdown
                    componentId={SearchComponents.PHASE}
                    indexKey={IndexFields.FIELD_PROJECT_PHASE_NAME}
                    filterKey="project_phase_taxonomy_terms"
                    label={Drupal.t('Project stage', {}, { context: 'District and project search form label' })}
                    placeholder={Drupal.t('All stages', {}, { context: 'District and project search form label' })}
                    setQuery={setQuery}
                    searchState={searchState}
                  />
                )}}
              URLParams={false}
            />
            <ReactiveComponent
              componentId={SearchComponents.TYPE}
              ref={typeRef}
              defaultQuery={() => ({
                aggs: {
                  [IndexFields.FIELD_PROJECT_TYPE_NAME]: {
                    terms: {
                      field: `${IndexFields.FIELD_PROJECT_TYPE_NAME}.keyword`,
                      size: 500,
                      order: { _key: 'asc' }
                    }
                  },
                  project_type_taxonomy_terms: {
                    terms: {
                      field: `${IndexFields.PROJECT_TYPE_NAME}.keyword`,
                      size: 500,
                      order: { _key: 'asc' }
                    }
                  }
                },
                query: languageFilter
              })}
              render={({ setQuery }) => {
                return (
                  <Dropdown
                    componentId={SearchComponents.TYPE}
                    indexKey={IndexFields.FIELD_PROJECT_TYPE_NAME}
                    filterKey="project_type_taxonomy_terms"
                    label={Drupal.t('Project type', {}, { context: 'District and project search form label' })}
                    placeholder={Drupal.t('All types', {}, { context: 'District and project search form label' })}
                    setQuery={setQuery}
                    searchState={searchState}
                  />
                )}}
              URLParams={false}
            />
          </div>
        </Accordion>
        <ReactiveComponent
          componentId={SearchComponents.SUBMIT}
          ref={submitButton}
          render={({ setQuery }) => {
            return (
              <div className='district-project-search-form__submit'>
                <SubmitButton
                  searchState={searchState}
                  setQuery={setQuery}
                />
              </div>
            );
          }}
          URLParams={false}
        />
        <ReactiveComponent
          componentId={SearchComponents.FILTER_BULLETS}
          render={({ setQuery }) => {
            return (
              <SelectionsContainer
                searchState={searchState}
                setQuery={setQuery}
                clearSelection={clearSelection}
                clearSelections={clearSelections}
              />
            );
          }}
          URLParams={false}
        />
      </div>
    </form>
  );
};

export default FormContainer;
