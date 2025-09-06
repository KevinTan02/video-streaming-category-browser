import { useState, useEffect } from 'react';
import CategoryList from './CategoryList/CategoryList';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/categories');
      const data = await response.json();
      setCategories(data);
      setSelectedCategory(data[0]);
    } catch (error) {
      console.log('error fetching categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </>
  );
}

export default App;
