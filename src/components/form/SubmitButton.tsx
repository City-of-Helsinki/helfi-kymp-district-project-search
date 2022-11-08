import { Button } from 'hds-react';
import { useEffect, useState } from 'react';

import { useLanguageQuery } from '../../hooks/useLanguageQuery';
import { getQuery } from '../../helpers/helpers';
import type SearchState from '../../types/SearchState';


type Props = {
  searchState: SearchState;
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
      {Drupal.t('Search', {}, { context: 'District and project search' })}
    </Button>
  );
};

export default SubmitButton;
