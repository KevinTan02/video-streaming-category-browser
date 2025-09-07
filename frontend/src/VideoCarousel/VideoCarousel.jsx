import { useEffect, useState, useRef } from 'react';
import './VideoCarousel.css';

const VideoCarousel = (props) => {
  const { selectedCategory, selectedVideoId, setSelectedVideoId } = props;
  const [videos, setVideos] = useState([]);
  const carouselRef = useRef(null);

  const fetchVideosFromCategory = async () => {
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
    fetchVideosFromCategory();
  }, [selectedCategory]);

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
      <button className="scroll-btn left" onClick={scrollLeft}>
        &#8249;
      </button>
      <div className="videos-container" ref={carouselRef}>
        {videos.map((video) => (
          <button
            key={video.id}
            className={video.id === selectedVideoId ? 'selected' : ''}
            onClick={handleVideoClick}
            value={video.id}
          >
            {video.title}
          </button>
        ))}
      </div>
      <button className="scroll-btn right" onClick={scrollRight}>
        &#8250;
      </button>
    </div>
  );
};

export default VideoCarousel;
