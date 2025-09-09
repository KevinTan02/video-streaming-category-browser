import { render, screen, fireEvent } from '@testing-library/react';
import VideoDetailsModal from './VideoDetailsModal';

global.fetch = jest.fn();

describe('VideoDetailsModal', () => {
  let mockSetSelectedVideoId;
  const mockVideoDetails = {
    id: 1,
    title: 'Test Video',
    description: 'This is a test video',
    duration: '5:00',
    category: 'Test Category',
  };

  beforeEach(() => {
    mockSetSelectedVideoId = jest.fn();
    fetch.mockResolvedValueOnce({
      json: async () => mockVideoDetails,
    });
    render(
      <VideoDetailsModal
        selectedVideoId={mockVideoDetails.id}
        setSelectedVideoId={mockSetSelectedVideoId}
      />
    );
  });

  test('close button calls handleCloseClick', async () => {
    const closeButton = await screen.findByTestId('close-button');
    fireEvent.click(closeButton);
    expect(mockSetSelectedVideoId).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedVideoId).toHaveBeenCalledWith();
  });

  test('video details displays properly', async () => {
    const title = await screen.findByTestId('video-title');
    const description = await screen.findByTestId('video-description');
    const duration = await screen.findByTestId('video-duration');
    const category = await screen.findByTestId('video-category');

    expect(title).toHaveTextContent(mockVideoDetails.title);
    expect(description).toHaveTextContent(mockVideoDetails.description);
    expect(duration).toHaveTextContent(mockVideoDetails.duration);
    expect(category).toHaveTextContent(mockVideoDetails.category);
  });

  test('clicking play button simulates video playing', async () => {
    const playButton = await screen.findByTestId('video-play-button');
    fireEvent.click(playButton);
    const playMessage = await screen.findByTestId('video-playing-message');
    expect(playMessage).toBeInTheDocument();
  });
});
