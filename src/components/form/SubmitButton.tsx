import { Button } from 'hds-react';
import { useCallback, useEffect, useState } from 'react';

import IndexFields from '../../enum/IndexFields';
import SearchComponents from '../../enum/SearchComponents';
import { useLanguageQuery } from '../../hooks/useLanguageQuery';
import type BooleanQuery from '../../types/BooleanQuery';
import { getQuery } from '../../helpers/helpers';

type SearchStateItem = {
  value: Array<string> | string;
};

type Props = {
  searchState: {
    [key: string]: SearchStateItem;
  };
  setQuery: Function;
};

export const SubmitButton = ({ searchState, setQuery }: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const languageFilter = useLanguageQuery();

  useEffect(() => {
    if (mounted) {
      return;
    }

    setQuery(getQuery({searchState, languageFilter}));
    setMounted(true);
  }, [getQuery, setQuery, mounted, setMounted, languageFilter]);

  return (
    <Button
      className='district-project-search-form__submit-button'
      type='submit'
      onClick={() => {
        setQuery(getQuery({searchState, languageFilter}));
      }}
      variant='primary'
      theme='black'
    >
      {Drupal.t('Search')}
    </Button>
  );
};

export default SubmitButton;
