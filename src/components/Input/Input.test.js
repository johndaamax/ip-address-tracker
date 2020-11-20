import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

const setup = () => {
    const handleChange = jest.fn();
    const utils = render(<Input placeholder='Enter IP' changeCallback={handleChange} />);
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
    fireEvent.change(input, { target: { value: '100' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('100');
})
