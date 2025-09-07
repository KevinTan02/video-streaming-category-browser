import './CategoryList.css';

const CategoryList = (props) => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    setSelectedVideoId,
  } = props;

  const handleCategoryClick = (e) => {
    if (e.target.value !== selectedCategory) {
      setSelectedVideoId();
    }
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
