import { useEffect, useState } from 'react';
import './VideoCarousel.css';

const VideoCarousel = (props) => {
  const { selectedCategory } = props;
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

  return (
    <div className="carousel-container">
      {videos.map((video) => {
        return <button>{video.title}</button>;
      })}
    </div>
  );
};

export default VideoCarousel;
