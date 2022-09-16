import { ReactiveBase } from '@appbaseio/reactivesearch';

import Settings from '../enum/Settings';

type Props = {
  children: React.ReactElement;
};

const BaseContainer = ({ children }: Props) => {
  return (
    <ReactiveBase
      app={Settings.INDEX}
      url={process.env.REACT_APP_ELASTIC_URL}
      style={{
        color: 'inherit',
        fontFamily: 'inherit'
      }}
    >
      {children}
    </ReactiveBase>
  );
};

export default BaseContainer;
