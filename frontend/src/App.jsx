import { useState, useEffect } from 'react';
import CategoryList from './CategoryList/CategoryList';
import VideoDetailsModal from './VideoDetailsModal/VideoDetailsModal';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import './App.css';

function App() {
  const [selectedVideoId, setSelectedVideoId] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <div className="home-container">
        <SearchBar setSearchQuery={setSearchQuery} />
        {searchQuery ? (
          <SearchResults
            setSelectedVideoId={setSelectedVideoId}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        ) : (
          <CategoryList setSelectedVideoId={setSelectedVideoId} />
        )}
        {selectedVideoId && (
          <>
            <div
              className="dim-overlay"
              onClick={() => setSelectedVideoId()}
            ></div>
            <VideoDetailsModal
              selectedVideoId={selectedVideoId}
              setSelectedVideoId={setSelectedVideoId}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
