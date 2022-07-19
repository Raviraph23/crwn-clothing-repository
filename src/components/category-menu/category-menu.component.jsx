import "./category-menu.style.scss";

import CatergoryItem from "../category-item/category-item.component";

const CategoryMenu = ({ categories }) => {
  return (
    <div className="categoriesMenu-container">
      {categories.map((category) => (
        <CatergoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryMenu;
