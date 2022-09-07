import { DataSearch, MultiDropdownList, MultiList, SelectedFilters } from '@appbaseio/reactivesearch';

const FormContainer = () => {
  // TODO: make filters use reactivecomponent
  return (
    <div className="component__container">
      <div className="component__content district-project-search">
        <div>
          <div>
            <DataSearch
              componentId="SearchBox"
              dataField={['title']}
              placeholder="Etsi hakusanalla, esim. Pasila"
              customQuery={props => ({
                query: {
                  term: {
                    "_language": "fi"
                  }
                }
              })}
            />
          </div>
          <div>
            <MultiDropdownList
              componentId="DistrictSensor"
              dataField="field_project_district_name"
              title="Mikä alue kiinnostaa sinua?"
              size={10}
              sortBy="count"
              showCount={true}
              placeholder="Kaikki kiinnostavat"
              // react={{
              //   and: ['searchbox'],
              // }}
              showFilter={true}
              // filterLabel="City"
              // URLParams={false}
              // loader="Loading ..."
            />
          </div>
          <div>
            <MultiDropdownList
              componentId="ThemeSensor"
              dataField="field_project_theme_name"
              title="Valitse hankkeen teema"
              size={10}
              sortBy="count"
              showCount={true}
              placeholder="Kaikki kiinnostavat"
              // react={{
              //   and: ['searchbox'],
              // }}
              showFilter={true}
              // filterLabel="City"
              // URLParams={false}
              // loader="Loading ..."
            />
          </div>
        </div>

        {/* CSS REACT TRANSITION BLOCK */}
        <div>
          <MultiList
            componentId="PhaseSensor"
            dataField="field_project_phase_name"
            title="Valitse hankkeen vaihe"
            size={100}
            sortBy="asc"
            queryFormat="or"
            selectAllLabel="All Cities"
            showCheckbox={true}
            showCount={true}
            showSearch={true}
            placeholder="Hankkeen vaihe"
            // react={{
            //   and: ['CategoryFilter', 'SearchFilter'],
            // }}
            showFilter={true}
            filterLabel="City"
            URLParams={false}
            loader="Loading ..."
          />
        </div>
        <div>
          <MultiList
            componentId="TypeSensor"
            dataField="field_project_type_name"
            title="Valitse hankkeen tyyppi"
            size={100}
            sortBy="asc"
            queryFormat="or"
            selectAllLabel="All Cities"
            showCheckbox={true}
            showCount={true}
            showSearch={true}
            placeholder="Hankkeen tyyppi"
            // react={{
            //   and: ['CategoryFilter', 'SearchFilter'],
            // }}
            showFilter={true}
            filterLabel="City"
            URLParams={false}
            loader="Loading ..."
          />
        </div>
        <SelectedFilters />
    </div>
  </div>

  );
};
export default FormContainer;
