import { useEffect, useState, useRef } from 'react';
import VideoCarousel from '../VideoCarousel/VideoCarousel';
import { useScrollable } from '../hooks/useScrollable';
import './CategoryList.css';

const CategoryList = ({ setSelectedVideoId }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [videos, setVideos] = useState([]);
  const categoryRef = useRef(null);
  const showArrows = useScrollable(categoryRef, [videos]);

  const handleCategoryClick = (e) => {
    if (e.target.value !== selectedCategory) {
      setSelectedVideoId();
    }
    setSelectedCategory(e.target.value);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/categories');
      const data = await response.json();
      setCategories(data);
      setSelectedCategory(data[0]);
    } catch (error) {
      console.log('error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getVideosFromCategory = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/videos?category=${selectedCategory}`
      );
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.log('unable to fetch videos:', error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      getVideosFromCategory();
    }
  }, [selectedCategory]);

  const getScrollAmount = () => categoryRef.current.offsetWidth * 0.5;

  const scrollLeft = () => {
    categoryRef.current.scrollBy({
      left: -getScrollAmount(),
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    categoryRef.current.scrollBy({
      left: getScrollAmount(),
      behavior: 'smooth',
    });
  };

  return categories.length === 0 ? (
    <div data-testid="category-loading">Loading Categories...</div>
  ) : (
    <div data-testid="category-list-container">
      <h2 data-testid="category-list-title" className="category-list-title">
        Categories
      </h2>
      <div className="category-list-container">
        {showArrows && (
          <button
            data-testid="scroll-btn-left"
            className="scroll-btn-left"
            onClick={scrollLeft}
          >
            ←
          </button>
        )}
        <div
          className="category-list"
          ref={categoryRef}
          data-testid="category-list"
        >
          {categories.map((category) => (
            <button
              key={category}
              className={category === selectedCategory ? 'selected' : ''}
              onClick={handleCategoryClick}
              value={category}
              data-testid={`category-btn-${category}`}
            >
              {category}
            </button>
          ))}
        </div>
        {showArrows && (
          <button
            data-testid="scroll-btn-right"
            className="scroll-btn-right"
            onClick={scrollRight}
          >
            →
          </button>
        )}
      </div>
      {selectedCategory && (
        <VideoCarousel
          setSelectedVideoId={setSelectedVideoId}
          videos={videos}
        />
      )}
    </div>
  );
};

export default CategoryList;
