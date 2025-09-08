import { useState, useEffect } from 'react';
import VideoCarousel from '../VideoCarousel/VideoCarousel';
import './SearchResults.css';

const SearchResults = (props) => {
  const { setSelectedVideoId, searchQuery, setSearchQuery } = props;
  const [videos, setVideos] = useState([]);

  const handleBack = () => {
    setSearchQuery('');
  };

  const getSearchResults = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/videos?search=${searchQuery}`
      );
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.log('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    getSearchResults();
  }, [searchQuery]);

  return (
    <div className="search-results-container">
      <button className="back-button" onClick={handleBack}>
        ← Back
      </button>
      <p>Search results for: {searchQuery}</p>
      {videos.length !== 0 ? (
        <VideoCarousel
          setSelectedVideoId={setSelectedVideoId}
          videos={videos}
        />
      ) : (
        <div> No videos found </div>
      )}
    </div>
  );
};

export default SearchResults;
