import { useState, useEffect } from 'react';
import CategoryList from './CategoryList/CategoryList';
import VideoDetailsModal from './VideoDetailsModal/VideoDetailsModal';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedVideoId, setSelectedVideoId] = useState();
  const [searchQuery, setSearchQuery] = useState('');

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
          <>
            {categories.length === 0 ? (
              <div> Loading Categories...</div>
            ) : (
              <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedVideoId={selectedVideoId}
                setSelectedVideoId={setSelectedVideoId}
              />
            )}
          </>
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
