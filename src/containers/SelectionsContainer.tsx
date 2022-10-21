import { Button, IconCross } from 'hds-react';
import { MouseEventHandler } from 'react';

import type OptionType from '../types/OptionType';
import { useLanguageQuery } from '../hooks/useLanguageQuery';
import { capitalize, getQuery } from '../helpers/helpers';


type SearchStateItem = {
  value: Array<string> | string;
};

type SelectionsContainerProps = {
  searchState: {
    [key: string]: SearchStateItem;
  };
  setQuery: Function;
  clearSelection: Function;
  //clearSelections: MouseEventHandler<HTMLButtonElement>;
  filters?: filtersType;
};

type filtersType = {
  districts: OptionType[];
  project_theme: OptionType[];
  project_phase: OptionType[];
  project_type: OptionType[];
};

const transformSearchState = (searchStateValues: any, componentIds: string[]): filtersType => {
  const filtered = Object.keys(searchStateValues)
    .filter(key => componentIds.includes(key) && searchStateValues[key].value != null)
    .reduce((acc: any, curr: any) => {
      acc[curr] = searchStateValues[curr];
      return acc;
  }, []);

  const filters = Object.keys(filtered).reduce((acc: any, current: any) => {
    const options: OptionType[] = filtered[current].value && filtered[current].value.map((value: string) => ({ label: capitalize(value), value: value }));
    acc[current] = options;
    
    return acc;
  }, {});

  return filters
};

const SelectionsContainer = ({ searchState, setQuery, clearSelection }: SelectionsContainerProps) => {
  const languageFilter = useLanguageQuery();
  const filters = transformSearchState(searchState, ['districts', 'project_theme', 'project_type', 'project_phase'])

  if (!filters.districts && !filters.project_theme && !filters.project_phase && !filters.project_type) {
    return null;
  }

  const transformedFilters: any = [];
  const { t } = Drupal;

  const clearSelections = () => {
    setQuery({ query: null })
    // setTitle('');
    // setDistricts([]);
    // setThemes([]);
    // setPhases([]);
    // setTypes([]);
  
    // if (submitButton && submitButton.current) {
    //   submitButton.current.setQuery({ query: null });
    // }
  };
  
  for (const [key, options] of Object.entries(filters)) {
    options.forEach((option: OptionType) => {
      transformedFilters.push(
        <li
          className='content-tags__tags__tag content-tags__tags--interactive'
          onClick={() => clearSelection(option, key)}
        >
          <Button
            aria-label={`${t('Remove', {}, {})} ${option.label} ${t('from search results', {}, { context: 'Search item aria label' })}`}
            className='district-project-search-form__remove-selection-button'
            iconRight={<IconCross />}
            variant='supplementary'
          >
            {capitalize(option.value)}
          </Button>
        </li>
      );
    });
  }

  return (
    <div className='district-project-search-form__selections-wrapper'>
      <ul className='district-project-search-form__selections-container content-tags__tags'>
        {transformedFilters}
        <li className='district-project-search-form__clear-all'>
          <Button
            className='district-project-search-form__clear-all-button'
            iconLeft={<IconCross className='district-project-search-form__clear-all-icon' />}
            // onClick={clearSelections}
            onClick={() => {
              // const jeejee: searchState = {
              //   districts: {},
              //   project_theme: {},
              //   project_phase: {},
              //   project_type: {},
              // }
              // setQuery(getQuery({jeejee, languageFilter}));
              setQuery({ query: null })
            }}
            variant='supplementary'
          >
            {Drupal.t('Clear selections', {}, { context: 'District and project search clear selections' })}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default SelectionsContainer;
