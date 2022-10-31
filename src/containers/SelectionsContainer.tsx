import { Button, IconCross } from 'hds-react';
import { MouseEventHandler, useState, useEffect } from 'react';

import type OptionType from '../types/OptionType';
import type SearchState from '../types/SearchState';
import type FiltersType from '../types/FiltersType';
import { capitalize, transformSearchState } from '../helpers/helpers';
import SearchComponents from '../enum/SearchComponents';

type SelectionsContainerProps = {
  searchState: SearchState;
  setQuery: Function;
  clearSelection: Function;
  clearSelections: MouseEventHandler<HTMLButtonElement>;
};

const SelectionsContainer = ({ searchState, clearSelection, clearSelections }: SelectionsContainerProps) => {
  const [submitButtonValue, setSubmitButtonValue] = useState<Number>(0);
  const [filters, setFilters] = useState<FiltersType>();

  // Check if searchState is changed by submit button.
  useEffect(() => {
    if (Number(searchState?.submit?.value) !== submitButtonValue) {
      setSubmitButtonValue(Number(searchState?.submit?.value) || 0);
    }
  }, [searchState]);

  // Update filter bullets when submit button is pressed.
  useEffect(() => {
    setFilters(transformSearchState(searchState, [SearchComponents.DISTRICTS, SearchComponents.THEME, SearchComponents.TYPE, SearchComponents.PHASE]));
  }, [submitButtonValue]);

  if (!filters?.districts && !filters?.project_theme && !filters?.project_phase && !filters?.project_type) {
    return null;
  }

  const transformedFilters: any = [];
  const { t } = Drupal;

  for (const [key, options] of Object.entries(filters)) {
    options.forEach((option: OptionType) => {
      transformedFilters.push(
        <li
          className='content-tags__tags__tag content-tags__tags--interactive'
          onClick={() => clearSelection(option, key)}
          key={option.value}
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

  if (!transformedFilters || transformedFilters.length <= 0) {
    return null;
  }

  return (
    <div className='district-project-search-form__selections-wrapper'>
      <ul className='district-project-search-form__selections-container content-tags__tags'>
        {transformedFilters || []}
        <li className='district-project-search-form__clear-all'>
          <Button
            className='district-project-search-form__clear-all-button'
            iconLeft={<IconCross className='district-project-search-form__clear-all-icon' />}
            onClick={clearSelections}
            variant='supplementary'
          >
            {Drupal.t('Clear selections', {}, { context: 'District and project search' })}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default SelectionsContainer;
