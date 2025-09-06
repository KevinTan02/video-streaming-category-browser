import { useEffect, useState } from 'react';
import './VideoCarousel.css';

const VideoCarousel = (props) => {
  const { selectedCategory, selectedVideoId, setSelectedVideoId } = props;
  const [videos, setVideos] = useState([]);

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

  return (
    <div className="carousel-container">
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
  );
};

export default VideoCarousel;
