import { render } from '@testing-library/react';

import CustomDetails from './CustomDetails';

test('verifies correct render of data', () => {
    const { getByText } = render(<CustomDetails heading='Test heading' value='Test value' />)

    expect(getByText('Test heading')).toBeInTheDocument();
    expect(getByText('Test value')).toBeInTheDocument();
});
