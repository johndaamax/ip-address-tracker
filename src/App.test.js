import { render } from '@testing-library/react';

import App from './App';

test('verifies error and details pane elements are not present on load', async () => {
  const { queryByTestId, findByTestId } = render(<App />);

  expect(queryByTestId('search-error')).not.toBeInTheDocument();
  expect(queryByTestId('details-pane-div')).not.toBeInTheDocument();
  //wait for the details div to load after page mounts and local IP info was fetched
  expect(await findByTestId('details-pane-div')).toBeInTheDocument();
});
