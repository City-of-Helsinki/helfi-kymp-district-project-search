import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Result from '../../types/Result';
import ResultCard from './ResultCard';

const mockResult: Result = {
  content_type: ['Project'],
  title: ['Search item'],
  url: ['https://helfi-kymp.docker.so/fi/kaupunkiymparisto-ja-liikenne/toolo-hanke'],
  field_project_image_url:['https://helfi-kymp.docker.so/sites/default/files/latauspiste.jpg'],
  project_execution_schedule: [1679745600, 1693483200],
  project_plan_schedule: [1661374800, 1677189599],
  field_project_district_name: ["taka-töölö", "töölö"],
  field_project_theme_name: ["asunnot"]
};

test('Renders correctly', () => {
  render(<ResultCard {...mockResult} />);

  // Renders title correctly
  expect(screen.getByRole('heading')).toHaveTextContent(mockResult.title[0]);

  // Handles time formatting correctly
  const time = document.querySelector('time');
  expect(time.dateTime).toEqual('2022-05-06T12:12');
  expect(time.childNodes[1].textContent).toEqual('11/2022');

  // Sets href value correctly
  const href = document.querySelector('a').href;
  expect(href).toEqual(mockResult.url[0]);
});
