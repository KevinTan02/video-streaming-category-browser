import { useEffect, useState } from 'react';
import './VideoDetailsModal.css';

const VideoDetailsModal = (props) => {
  const { selectedVideoId, setSelectedVideoId } = props;
  const [videoDetails, setVideoDetails] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCloseClick = () => {
    setSelectedVideoId();
  };

  useEffect(() => {
    if (selectedVideoId) {
      getVideoDetailsById();
    }
  }, [selectedVideoId]);

  const getVideoDetailsById = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/videos/${selectedVideoId}`
      );
      const data = await response.json();
      setVideoDetails(data);
    } catch (error) {
      console.log('error fetching video details:', error);
    }
  };

  return (
    <div className="video-details-modal-container">
      {videoDetails ? (
        <>
          <button className="close-button" onClick={handleCloseClick}>
            x
          </button>
          <div className="header">
            <h1>Video Details</h1>
          </div>
          <div className="video-details">
            <p>
              <span className="label">Title: </span>
              {videoDetails.title}
            </p>
            <p>
              <span className="label">Description: </span>
              {videoDetails.description}
            </p>
            <p>
              <span className="label">Duration: </span>
              {videoDetails.duration}
            </p>
            <p>
              <span className="label">Category: </span>
              {videoDetails.category}
            </p>
          </div>
          <div className="play-button-container">
            {isPlaying ? (
              <p>Simulating video playing</p>
            ) : (
              <button
                className="play-button"
                onClick={() => setIsPlaying(true)}
              >
                ⏵
              </button>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VideoDetailsModal;
