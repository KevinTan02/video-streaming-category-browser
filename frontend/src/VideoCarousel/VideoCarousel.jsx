import { useRef } from 'react';
import { useScrollable } from '../hooks/useScrollable';
import './VideoCarousel.css';

const VideoCarousel = (props) => {
  const { setSelectedVideoId, videos } = props;
  const carouselRef = useRef(null);
  const showArrows = useScrollable(carouselRef, [videos]);

  const handleVideoClick = (e) => {
    setSelectedVideoId(parseInt(e.target.value));
  };

  const getScrollAmount = () => {
    const containerWidth = carouselRef.current.offsetWidth;
    return containerWidth * 0.5;
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -getScrollAmount(),
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: getScrollAmount(),
      behavior: 'smooth',
    });
  };

  return (
    <div className="carousel-container">
      {showArrows && (
        <button className="scroll-btn-left" onClick={scrollLeft}>
          ←
        </button>
      )}
      <div className="videos-container" ref={carouselRef}>
        {videos.map((video) => (
          <button key={video.id} onClick={handleVideoClick} value={video.id}>
            {video.thumbnail}
          </button>
        ))}
      </div>
      {showArrows && (
        <button className="scroll-btn-right" onClick={scrollRight}>
          →
        </button>
      )}
    </div>
  );
};

export default VideoCarousel;
