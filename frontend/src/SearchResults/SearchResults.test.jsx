import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchResults from './SearchResults';

describe('SearchResults', () => {
  const mockSetSelectedVideoId = jest.fn();
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  test('displays search query', () => {
    render(
      <SearchResults
        searchQuery="test"
        setSearchQuery={mockSetSearchQuery}
        setSelectedVideoId={mockSetSelectedVideoId}
      />
    );

    expect(screen.getByTestId('search-query')).toHaveTextContent(
      'Search results for: test'
    );
  });

  test('calls setSearchQuery when back button clicked', () => {
    render(
      <SearchResults
        searchQuery="test"
        setSearchQuery={mockSetSearchQuery}
        setSelectedVideoId={mockSetSelectedVideoId}
      />
    );

    fireEvent.click(screen.getByTestId('back-button'));
    expect(mockSetSearchQuery).toHaveBeenCalledWith('');
  });

  test('renders "No videos found" when fetch returns empty array', async () => {
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce([]),
    });

    render(
      <SearchResults
        searchQuery="test"
        setSearchQuery={mockSetSearchQuery}
        setSelectedVideoId={mockSetSelectedVideoId}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('No videos found')).toBeInTheDocument();
    });
  });
});
