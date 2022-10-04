import { useRef, useState } from 'react';
import { ReactiveComponent, SelectedFilters, StateProvider } from '@appbaseio/reactivesearch';
import { TextInput, Accordion, IconLocation } from 'hds-react';

import Dropdown from '../components/form/Dropdown';
import SelectionsContainer from './SelectionsContainer';
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
  const [isAccordionInitiallyOpen, setIsAccordionOpen] = useState(initialState.isParamsSet);
  const languageFilter = useLanguageQuery();
  const submitButton = useRef<any>(null);

  const clearSelections = () => {
    setTitle('');
    setDistricts([]);
    setThemes([]);
    setPhases([]);
    setTypes([]);

    if (submitButton && submitButton.current) {
      submitButton.current.setQuery({ query: null });
    }
  };

  const clearSelection = (selection: OptionType, selectionType: string) => {
    let state;
    let stateHandler;
    switch (selectionType) {
      case 'districts':
        state = [...districts];
        stateHandler = setDistricts;
        break;
      case 'themes':
        state = [...themes];
        stateHandler = setThemes;
        break;
      case 'phases':
        state = [...phases];
        stateHandler = setPhases;
        break;
      case 'types':
        state = [...types];
        stateHandler = setTypes;
        break;
      default:
        break;
    }

    const index = state?.findIndex((option) => {
      return option.value === selection.value;
    });

    if (index !== undefined && state && stateHandler) {
      state.splice(index, 1);
      stateHandler(state);
    }
  };

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
                label={Drupal.t('Asuinalueen tai hankkeen nimi', {}, { context: 'District and project search form label' })}
                placeholder={Drupal.t('Etsi hakusanalla, esim. Pasila', {}, { context: 'District and project search form label' })}
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
              [IndexFields.FIELD_PROJECT_DISTRICT_NAME]: {
                terms: {
                  field: IndexFields.FIELD_PROJECT_DISTRICT_NAME,
                  size: 500,
                  order: { _key: 'asc' }
                }
              },
              district_taxonomy_terms: {
                terms: {
                  field: 'name',
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
                indexKey={IndexFields.FIELD_PROJECT_DISTRICT_NAME}
                taxonomyKey="district_taxonomy_terms"
                icon={<IconLocation />}
                label={Drupal.t('Valitse asuinalue listasta', {}, { context: 'District and project search form label' })}
                placeholder={Drupal.t('Valitse alue', {}, { context: 'District and project search form label' })}
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
        heading={Drupal.t('Tarkenna hankkeiden hakua', {}, { context: 'District and project search' })}
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
                  label={Drupal.t('Hankkeen teema', {}, { context: 'District and project search form label' })}
                  placeholder={Drupal.t('Kaikki teemat', {}, { context: 'District and project search form label' })}
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
              query: languageFilter,
            })}
            render={({ aggregations, setQuery }) => {
              return (
                <Dropdown
                  aggregations={aggregations}
                  indexKey={IndexFields.FIELD_PROJECT_PHASE_NAME}
                  taxonomyKey="project_phase_taxonomy_terms"
                  label={Drupal.t('Hankkeen vaihe', {}, { context: 'District and project search form label' })}
                  placeholder={Drupal.t('Kaikki vaiheet', {}, { context: 'District and project search form label' })}
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
              query: languageFilter,
            })}
            render={({ aggregations, setQuery }) => {
              return (
                <Dropdown
                  aggregations={aggregations}
                  indexKey={IndexFields.FIELD_PROJECT_TYPE_NAME}
                  taxonomyKey="project_type_taxonomy_terms"
                  label={Drupal.t('Hankkeen tyyppi', {}, { context: 'District and project search form label' })}
                  placeholder={Drupal.t('Kaikki tyypit', {}, { context: 'District and project search form label' })}
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
      {/* <SelectionsContainer
        clearSelection={clearSelection}
        clearSelections={clearSelections}
        filters={{
          districts: districts,
          themes: themes,
          phases: phases,
          types: types
        }}
      /> */}
    </div>
  );
};
export default FormContainer;
