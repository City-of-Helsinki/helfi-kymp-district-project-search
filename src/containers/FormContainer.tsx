import { useRef, useState } from 'react';
import { ReactiveComponent, StateProvider } from '@appbaseio/reactivesearch';
import { TextInput, Accordion, IconLocation } from 'hds-react';

import Dropdown from '../components/form/Dropdown';
import SearchComponents from '../enum/SearchComponents';
import SubmitButton from '../components/form/SubmitButton';
import IndexFields from '../enum/IndexFields';
import useLanguageQuery from '../hooks/useLanguageQuery';
import type OptionType from '../types/OptionType';

type FormContainerProps = {
  initialState: {
    isParamsSet: boolean;
    title: string;
    districts: OptionType[];
    themes: OptionType[];
    phases: OptionType[];
    types: OptionType[];
  };
};

const FormContainer = ({ initialState }: FormContainerProps) => {
  const [title, setTitle] = useState(initialState.title);
  const [districts, setDistricts] = useState(initialState.districts);
  const [themes, setThemes] = useState(initialState.themes);
  const [phases, setPhases] = useState(initialState.phases);
  const [types, setTypes] = useState(initialState.types);
  const [isAccordionInitiallyOpen] = useState(initialState.isParamsSet);
  const languageFilter = useLanguageQuery();
  const submitButton = useRef<any>(null);

  return (
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
          URLParams={true}
        />
        <ReactiveComponent
          componentId={SearchComponents.DISTRICTS}
          defaultQuery={() => ({
            aggs: {
              [IndexFields.FIELD_PROJECT_DISTRICT_TITLE]: {
                terms: {
                  field: IndexFields.FIELD_PROJECT_DISTRICT_TITLE,
                  size: 500,
                  order: { _key: 'asc' }
                }
              },
              districts_for_filters: {
                terms: {
                  field: 'district_title',
                  size: 500,
                  order: { _key: 'asc' }
                }
              }
            },
            query: languageFilter
          })}
          render={({ aggregations, setQuery }) => {
            console.log(aggregations)
            return (
              <Dropdown
                aggregations={aggregations}
                indexKey={IndexFields.FIELD_PROJECT_DISTRICT_TITLE}
                // TODO: change taxonomyKey name to something else
                taxonomyKey="districts_for_filters"
                icon={<IconLocation />}
                label={Drupal.t('Select the residential area from the list', {}, { context: 'District and project search form label' })}
                placeholder={Drupal.t('Select area', {}, { context: 'District and project search form label' })}
                setQuery={setQuery}
                setValue={setDistricts}
                value={districts}
              />
            )}}
          URLParams={true}
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
            defaultQuery={() => ({
              aggs: {
                [IndexFields.FIELD_PROJECT_THEME_NAME]: {
                  terms: {
                    field: IndexFields.FIELD_PROJECT_THEME_NAME,
                    size: 500,
                    order: { _key: 'asc' }
                  }
                },
                project_theme_taxonomy_terms: {
                  terms: {
                    field: 'project_theme_name',
                    size: 500,
                    order: { _key: 'asc' }
                  }
                }
              },
              query: languageFilter,
            })}
            render={({ aggregations, setQuery }) => {
              return (
                <Dropdown
                  aggregations={aggregations}
                  indexKey={IndexFields.FIELD_PROJECT_THEME_NAME}
                  taxonomyKey="project_theme_taxonomy_terms"
                  label={Drupal.t('Project theme', {}, { context: 'District and project search form label' })}
                  placeholder={Drupal.t('All themes', {}, { context: 'District and project search form label' })}
                  setQuery={setQuery}
                  setValue={setThemes}
                  value={themes}
                />
              )}}
            URLParams={true}
          />
          <ReactiveComponent
            componentId={SearchComponents.PHASE}
            defaultQuery={() => ({
              aggs: {
                [IndexFields.FIELD_PROJECT_PHASE_NAME]: {
                  terms: {
                    field: IndexFields.FIELD_PROJECT_PHASE_NAME,
                    size: 500,
                    order: { _key: 'asc' }
                  }
                },
                project_phase_taxonomy_terms: {
                  terms: {
                    field: 'project_phase_name',
                    size: 500,
                    order: { _key: 'asc' }
                  }
                }
              },
              query: languageFilter
            })}
            render={({ aggregations, setQuery }) => {
              return (
                <Dropdown
                  aggregations={aggregations}
                  indexKey={IndexFields.FIELD_PROJECT_PHASE_NAME}
                  taxonomyKey="project_phase_taxonomy_terms"
                  label={Drupal.t('Project stage', {}, { context: 'District and project search form label' })}
                  placeholder={Drupal.t('All stages', {}, { context: 'District and project search form label' })}
                  setQuery={setQuery}
                  setValue={setPhases}
                  value={phases}
                />
              )}}
            URLParams={true}
          />
          <ReactiveComponent
            componentId={SearchComponents.TYPE}
            defaultQuery={() => ({
              aggs: {
                [IndexFields.FIELD_PROJECT_TYPE_NAME]: {
                  terms: {
                    field: IndexFields.FIELD_PROJECT_TYPE_NAME,
                    size: 500,
                    order: { _key: 'asc' }
                  }
                },
                project_type_taxonomy_terms: {
                  terms: {
                    field: 'project_type_name',
                    size: 500,
                    order: { _key: 'asc' }
                  }
                }
              },
              query: languageFilter
            })}
            render={({ aggregations, setQuery }) => {
              return (
                <Dropdown
                  aggregations={aggregations}
                  indexKey={IndexFields.FIELD_PROJECT_TYPE_NAME}
                  taxonomyKey="project_type_taxonomy_terms"
                  label={Drupal.t('Project type', {}, { context: 'District and project search form label' })}
                  placeholder={Drupal.t('All types', {}, { context: 'District and project search form label' })}
                  setQuery={setQuery}
                  setValue={setTypes}
                  value={types}
                />
              )}}
            URLParams={true}
          />
        </div>
      </Accordion>
      <ReactiveComponent
        componentId={SearchComponents.SUBMIT}
        ref={submitButton}
        render={({ setQuery }) => {
          return (
            <StateProvider includeKeys={['value']}>
              {({ searchState }) => (
                <div className='district-project-search-form__submit'>
                  <SubmitButton searchState={searchState} setQuery={setQuery} />
                </div>
              )}
            </StateProvider>
          );
        }}
        URLParams={false}
      />
    </div>
  );
};
export default FormContainer;
