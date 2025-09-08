import { useState, useEffect } from 'react';
import CategoryList from './CategoryList/CategoryList';
import VideoCarousel from './VideoCarousel/VideoCarousel';
import VideoDetailsModal from './VideoDetailsModal/VideoDetailsModal';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedVideoId, setSelectedVideoId] = useState();

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
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedVideoId={setSelectedVideoId}
        />
        <VideoCarousel
          selectedCategory={selectedCategory}
          selectedVideoId={selectedVideoId}
          setSelectedVideoId={setSelectedVideoId}
        />
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
