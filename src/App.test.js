import { render } from '@testing-library/react';

import App from './App';

test('verifies error and details pane elements are not present on load', () => {
  const { queryByTestId } = render(<App />);

  expect(queryByTestId('search-error')).not.toBeInTheDocument();
  expect(queryByTestId('details-pane-div')).not.toBeInTheDocument();
});
