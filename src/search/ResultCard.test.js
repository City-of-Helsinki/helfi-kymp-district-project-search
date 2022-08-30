import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Result from '../types/Result';
import ResultCard from './ResultCard';

const mockResult: Result = {
  field_project_image_url:['https://helfi-kymp.docker.so/sites/default/files/latauspiste.jpg'],
  title: ['Search item'],
  url: ['https://helfi-kymp.docker.so/fi/123'],
};

test('Renders correctly', () => {
  render(<ResultCard {...mockResult} />);

  // Renders title correctly
  expect(screen.getByRole('heading')).toHaveTextContent(mockResult.title[0]);

  // Sets href value correctly
  const href = document.querySelector('a').href;
  expect(href).toEqual(mockResult.url[0]);
});
