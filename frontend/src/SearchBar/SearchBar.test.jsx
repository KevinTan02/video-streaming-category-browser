import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  let setSearchQueryMock;

  beforeEach(() => {
    setSearchQueryMock = jest.fn();
    render(<SearchBar setSearchQuery={setSearchQueryMock} />);
  });

  test('updates input value on typing', () => {
    const input = screen.getByTestId('search-text');
    fireEvent.change(input, { target: { value: 'Action' } });
    expect(input.value).toBe('Action');
  });

  test('clears input when"Clear button is clicked', () => {
    const input = screen.getByTestId('search-text');
    const clearButton = screen.getByTestId('clear-button');

    fireEvent.change(input, { target: { value: 'Action' } });
    fireEvent.click(clearButton);

    expect(input.value).toBe('');
  });

  test('submits input and trims it', () => {
    const input = screen.getByTestId('search-text');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(input, { target: { value: ' Action ' } });
    fireEvent.click(submitButton);

    expect(setSearchQueryMock).toHaveBeenCalledWith(' Action ');
    expect(input.value).toBe('Action');
  });

  test('does not call setSearchQuery if input is empty or whitespace', () => {
    const input = screen.getByTestId('search-text');
    const submitButton = screen.getByTestId('submit-button');

    // empty input
    fireEvent.click(submitButton);
    expect(setSearchQueryMock).not.toHaveBeenCalled();

    // whitespace input
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(submitButton);
    expect(setSearchQueryMock).not.toHaveBeenCalled();
  });
});
