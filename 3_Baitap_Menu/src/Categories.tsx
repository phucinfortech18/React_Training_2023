type Props = {
  categories: string[];
  selectCategory: string;
  onSelectCategory: (category: string) => void;
};

function Categories({ categories, selectCategory, onSelectCategory }: Props) {
  return (
    <div className="btn-container">
      {categories.map((category, index) => {
        return (
          <button
            type="button"
            className={`filter-btn ${selectCategory === category && "active"}`}
            key={index}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default Categories;
