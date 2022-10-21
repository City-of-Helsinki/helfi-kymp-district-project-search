import { useEffect, useState } from 'react';
import { Combobox } from 'hds-react';
import type { ComboboxProps } from 'hds-react';

import useAggregations from '../../hooks/useAggregations';
import type { Aggregations } from '../../types/Aggregations';
import OptionType from '../../types/OptionType';
import { capitalize } from '../../helpers/helpers';



type DropdownProps = Omit<
  ComboboxProps<OptionType>,
  'options' | 'clearButtonAriaLabel' | 'selectedItemRemoveButtonAriaLabel' | 'toggleButtonAriaLabel'
> & {
  componentId: string;
  label: string;
  icon?: JSX.Element;
  indexKey: string;
  filterKey: string;
  placeholder: string;
  setQuery: Function;
  clearButtonAriaLabel?: string;
  selectedItemRemoveButtonAriaLabel?: string;
  toggleButtonAriaLabel?: string;
  searchState: any;
};

const getAggregations = (searchStateValues: any, componentId: string) => {
  return !searchStateValues?.[componentId]?.aggregations ? [] : searchStateValues[componentId].aggregations;
};


const transformSearchState = (searchStateValue: any, componentId: string): OptionType[]=> {
  if (!searchStateValue?.[componentId]?.value) {
    return [];
  }

  return searchStateValue[componentId].value.map((value: string) => ({ label: capitalize(value), value: value }));
};

export const Dropdown = ({
  componentId,
  label,
  icon,
  indexKey,
  filterKey,
  placeholder,
  setQuery,
  clearButtonAriaLabel = Drupal.t('Clear selection', {}, { context: 'District and project search clear button aria label' }),
  selectedItemRemoveButtonAriaLabel = Drupal.t('Remove item', {}, { context: 'District and project search remove item aria label' }),
  toggleButtonAriaLabel = Drupal.t('Open the combobox', {}, { context: 'District and project search open dropdown aria label' }),
  searchState
}: DropdownProps): JSX.Element => {
  const aggregations: Aggregations = getAggregations(searchState, componentId)
  const options: OptionType[] = useAggregations(aggregations, indexKey, filterKey);
  const [value, setValue] = useState<OptionType[]>(() => transformSearchState(searchState, componentId));

  useEffect(() => {
    if (!value || !value.length) {
      setQuery({ value: null });
    } else {
      setQuery({ value: value.map((option: OptionType) => option.value) });
    }
  }, [value, setQuery]);

  return (
    <div className="district-project-search-form__filter">
      <Combobox
        clearButtonAriaLabel={clearButtonAriaLabel}
        label={label}
        icon={icon}
        options={options}
        onChange={(value: OptionType[]) => {
          setValue(value);
        }}
        placeholder={placeholder}
        multiselect={true}
        selectedItemRemoveButtonAriaLabel={selectedItemRemoveButtonAriaLabel}
        toggleButtonAriaLabel={toggleButtonAriaLabel}
        value={value}
      />
    </div>
  );
};

export default Dropdown;
