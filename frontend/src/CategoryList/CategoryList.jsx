import { useEffect, useState, useRef } from 'react';
import VideoCarousel from '../VideoCarousel/VideoCarousel';
import { useScrollable } from '../hooks/useScrollable';
import './CategoryList.css';

const CategoryList = (props) => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    setSelectedVideoId,
  } = props;

  const [videos, setVideos] = useState([]);
  const categoryRef = useRef(null);
  const showArrows = useScrollable(categoryRef, [videos]);

  const handleCategoryClick = (e) => {
    if (e.target.value !== selectedCategory) {
      setSelectedVideoId();
    }
    setSelectedCategory(e.target.value);
  };

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
    getVideosFromCategory();
  }, [selectedCategory]);

  const getScrollAmount = () => {
    const containerWidth = categoryRef.current.offsetWidth;
    return containerWidth * 0.5;
  };

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

  return (
    <div>
      <h2 className="category-list-title">Categories</h2>
      <div className="category-list-container">
        {showArrows && (
          <button className="scroll-btn-left" onClick={scrollLeft}>
            ←
          </button>
        )}
        <div className="category-list" ref={categoryRef}>
          {categories.map((category) => (
            <button
              key={category}
              className={category === selectedCategory ? 'selected' : ''}
              onClick={handleCategoryClick}
              value={category}
            >
              {category}
            </button>
          ))}
        </div>
        {showArrows && (
          <button className="scroll-btn-right" onClick={scrollRight}>
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
