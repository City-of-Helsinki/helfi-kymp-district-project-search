import { useEffect, useState } from 'react';
import { Select } from 'hds-react';
import type { SelectProps } from 'hds-react';

import type OptionType from '../../types/OptionType';
import type SearchState from '../../types/SearchState';
import SortOptions from '../../enum/SortOptions';
import { ComponentMap } from '../../helpers/helpers';

type SortDropdownProps = Omit<
  SelectProps<OptionType>,
  'options' | 'clearButtonAriaLabel'
> & {
  componentId: string;
  label: string;
  placeholder?: string;
  setQuery: Function;
  searchState?: SearchState;
  clearButtonAriaLabel?: string;
  setSort: Function;
};

const getSortValue = (searchStateValue: any, componentId: string, options: OptionType[]): OptionType => {
  if (!searchStateValue?.[componentId]?.value) {
    return options[1];
  }

  const selectedOption = options.find(item => searchStateValue[componentId].value.includes(item.value));
  return selectedOption !== undefined ? selectedOption : options[1];
};

export const SortDropdown = ({
  componentId,
  label,
  setQuery,
  searchState,
  setSort
}: SortDropdownProps): JSX.Element => {
  const [value, setValue] = useState<OptionType>(() => getSortValue(searchState, componentId, SortOptions));
  const [submitButtonValue, setSubmitButtonValue] = useState<Number>(0);

  useEffect(() => {
    if (!value) {
      setQuery({ value: null });
    } else {
      setQuery({ value: value.value });
    }
  }, [value, setQuery]);

  useEffect(() => {
    // Check if searchState is changed by submit button.
    if (searchState?.submit?.value && Number(searchState?.submit?.value) !== submitButtonValue) {
      setSubmitButtonValue(Number(searchState.submit.value));

      let update = false;
      Object.keys(ComponentMap).forEach((key: string) => {
        if (searchState[key].value != null) {
          update = true;
        }
      });

      if (update) {
        setValue(SortOptions[0]);
        setSort(SortOptions[0]);
      }
      else {
        setValue(SortOptions[1]);
        setSort(SortOptions[1]);
      }
    }
  }, [searchState, setSubmitButtonValue, setSort, submitButtonValue]);

  return (
    <div className="district-project-search-form__filter">
      <Select
        label={label}
        options={SortOptions}
        value={value}
        onChange={(selectedValue: OptionType) => {
          setValue(selectedValue);
          setSort(selectedValue);
        }}
        style={{ minWidth: '280px' }}
      />
    </div>
  );
};

export default SortDropdown;
