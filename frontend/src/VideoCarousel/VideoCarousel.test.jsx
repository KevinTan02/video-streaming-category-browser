import { render, screen, fireEvent } from '@testing-library/react';
import VideoCarousel from './VideoCarousel';

jest.mock('../hooks/useScrollable', () => ({
  useScrollable: jest.fn(),
}));

import { useScrollable } from '../hooks/useScrollable';

describe('VideoCarousel', () => {
  const mockSetSelectedVideoId = jest.fn();
  const videos = [
    { id: 1, thumbnail: 'Mock Thumbnail 1' },
    { id: 2, thumbnail: 'Mock Thumbnail 2' },
    { id: 3, thumbnail: 'Mock Thumbnail 3' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all videos', () => {
    render(
      <VideoCarousel
        setSelectedVideoId={mockSetSelectedVideoId}
        videos={videos}
      />
    );

    videos.forEach((video) => {
      expect(screen.getByTestId(`video-${video.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`video-${video.id}`)).toHaveTextContent(
        video.thumbnail
      );
    });
  });

  test('clicking a video calls setSelectedVideoId with correct id', async () => {
    render(
      <VideoCarousel
        setSelectedVideoId={mockSetSelectedVideoId}
        videos={videos}
      />
    );

    const videoButton = await screen.findByTestId('video-2');
    fireEvent.click(videoButton);

    expect(mockSetSelectedVideoId).toHaveBeenCalledWith(2);
  });

  test('renders scroll arrows when useScrollable returns true', () => {
    useScrollable.mockReturnValue(true);
    render(
      <VideoCarousel
        setSelectedVideoId={mockSetSelectedVideoId}
        videos={videos}
      />
    );

    expect(screen.getByTestId('scroll-left')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-right')).toBeInTheDocument();
  });
});
