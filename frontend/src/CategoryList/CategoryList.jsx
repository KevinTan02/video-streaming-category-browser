import './CategoryList.css';

const CategoryList = (props) => {
  const { categories, selectedCategory, setSelectedCategory } = props;

  const handleCategoryClick = (e) => {
    console.log('category button click! e.target.value:', e.target.value);
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <h2 className="category-list-title">Categories</h2>
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={category === selectedCategory ? 'selected' : ''}
            onClick={handleCategoryClick}
            value={category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
