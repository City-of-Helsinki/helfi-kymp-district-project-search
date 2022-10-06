import { Combobox } from 'hds-react';
import type { ComboboxProps } from 'hds-react';
import { useEffect } from 'react';

import useAggregations from '../../hooks/useAggregations';
import type { Aggregations } from '../../types/Aggregations';
import OptionType from '../../types/OptionType';


type DropdownProps = Omit<
  ComboboxProps<OptionType>,
  'options' | 'clearButtonAriaLabel' | 'selectedItemRemoveButtonAriaLabel' | 'toggleButtonAriaLabel'
> & {
  aggregations: Aggregations;
  label: string;
  icon?: JSX.Element;
  indexKey: string;
  taxonomyKey: string;
  placeholder: string;
  setQuery: Function;
  setValue: Function;
  value: OptionType[];
  clearButtonAriaLabel?: string;
  selectedItemRemoveButtonAriaLabel?: string;
  toggleButtonAriaLabel?: string;
};

export const Dropdown = ({
  aggregations,
  label,
  icon,
  indexKey,
  taxonomyKey,
  placeholder,
  setQuery,
  setValue,
  value,
  clearButtonAriaLabel = Drupal.t('Clear selection', {}, { context: 'District and project search clear button aria label' }),
  selectedItemRemoveButtonAriaLabel = Drupal.t('Remove item', {}, { context: 'District and project search remove item aria label' }),
  toggleButtonAriaLabel = Drupal.t('Open the combobox', {}, { context: 'District and project search open dropdown aria label' }),
}: DropdownProps): JSX.Element => {
  const options: OptionType[] = useAggregations(aggregations, indexKey, taxonomyKey);

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
