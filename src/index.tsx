import './i18n';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import React from 'react';
import ReactDOM from 'react-dom';

import Settings from './enum/Settings';
import SearchContainer from './search/SearchContainer';


const rootSelector: string = 'helfi-kymp-district-project-search';
const rootElement: HTMLElement | null = document.getElementById(rootSelector);

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <ReactiveBase app={Settings.INDEX} url={process.env.REACT_APP_ELASTIC_URL}>
        <SearchContainer />
      </ReactiveBase>
    </React.StrictMode>,
    document.getElementById('helfi-kymp-district-project-search')
  );
}
