import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CategoryList from './CategoryList';

jest.mock('../hooks/useScrollable', () => ({
  useScrollable: jest.fn(),
}));

import { useScrollable } from '../hooks/useScrollable';

global.fetch = jest.fn();

const mockCategories = ['Action', 'Comedy', 'Drama'];
const mockVideos = [
  { id: 1, title: 'Video 1' },
  { id: 2, title: 'Video 2' },
];

describe('CategoryList', () => {
  beforeEach(() => {
    fetch.mockImplementation((url) => {
      if (url.endsWith('/categories')) {
        return Promise.resolve({ json: () => Promise.resolve(mockCategories) });
      } else if (url.includes('/videos?category=')) {
        return Promise.resolve({ json: () => Promise.resolve(mockVideos) });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading initially', () => {
    render(<CategoryList setSelectedVideoId={jest.fn()} />);
    expect(screen.getByTestId('category-loading')).toBeInTheDocument();
  });

  test('fetches and displays categories', async () => {
    render(<CategoryList setSelectedVideoId={jest.fn()} />);

    const categoryListTitle = await screen.findByTestId('category-list-title');
    expect(categoryListTitle).toBeInTheDocument();

    const actionBtn = await screen.findByTestId('category-btn-Action');
    const comedyBtn = await screen.findByTestId('category-btn-Comedy');
    const dramaBtn = await screen.findByTestId('category-btn-Drama');

    expect(actionBtn).toBeInTheDocument();
    expect(comedyBtn).toBeInTheDocument();
    expect(dramaBtn).toBeInTheDocument();
  });

  test('selecting a category updates selectedCategory and fetches videos', async () => {
    const setSelectedVideoId = jest.fn();
    render(<CategoryList setSelectedVideoId={setSelectedVideoId} />);

    const comedyBtn = await screen.findByTestId('category-btn-Comedy');
    fireEvent.click(comedyBtn);

    const videoCarousel = await screen.findByTestId('carousel-container');
    expect(videoCarousel).toBeInTheDocument();

    expect(setSelectedVideoId).toHaveBeenCalled();
  });

  test('renders scroll arrows when useScrollable returns true', async () => {
    useScrollable.mockReturnValue(true);
    render(<CategoryList setSelectedVideoId={jest.fn()} />);

    const leftArrow = await screen.findByTestId('scroll-btn-left');
    const rightArrow = await screen.findByTestId('scroll-btn-right');

    expect(leftArrow).toBeInTheDocument();
    expect(rightArrow).toBeInTheDocument();
  });
});
