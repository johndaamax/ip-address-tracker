import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchForm from './SearchForm';

const setup = () => {
    const handleChange = jest.fn();
    const utils = render(<SearchForm changeCallback={handleChange} />);
    const input = utils.getByLabelText('search');
    const button = utils.getByRole('button');
    return {
        input,
        handleChange,
        button,
        ...utils,
    }
}

test('verifies input render', () => {
    const { input, button } = setup();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
});

test('calls changeCallback prop when typed', () => {
    const { input, handleChange } = setup();
    userEvent.type(input, '100');
    expect(handleChange).toHaveBeenCalledWith('100');
    expect(input).toHaveValue('100');
})
