import { useRef } from 'react';
import './VideoCarousel.css';

const VideoCarousel = (props) => {
  const { setSelectedVideoId, videos } = props;
  const carouselRef = useRef(null);

  const handleVideoClick = (e) => {
    setSelectedVideoId(parseInt(e.target.value));
  };

  const scrollLeft = () => {
    //todo: scroll by card width
    carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    //todo: same as above
    carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="carousel-container">
      <button className="scroll-btn-left" onClick={scrollLeft}>
        ←
      </button>
      <div className="videos-container" ref={carouselRef}>
        {videos.map((video) => (
          <button key={video.id} onClick={handleVideoClick} value={video.id}>
            {video.thumbnail}
          </button>
        ))}
      </div>
      <button className="scroll-btn-right" onClick={scrollRight}>
        →
      </button>
    </div>
  );
};

export default VideoCarousel;
