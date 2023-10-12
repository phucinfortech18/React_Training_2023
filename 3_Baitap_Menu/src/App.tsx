import { useState } from "react";
import "./App.css";
import Categories from "./Categories";
import Menus from "./Menus";
import { menu } from "./types/data";

function App() {
  const categories = menu.map((item) => item.category);
  const uniqueCategories = ["all", ...new Set(categories)];
  // console.log(categories);
  // console.log("uniqueCategories", uniqueCategories);

  const [selectCategory, setSelectCategory] = useState("all");
  const handleSelectedCategory = (category: string) => {
    setSelectCategory(category);
  };

  const filterMenus =
    selectCategory === "all"
      ? menu
      : menu.filter((item) => item.category === selectCategory);

  return (
    <>
      <h3 className="m-4">Bai tap Menu</h3>
      <Categories
        categories={uniqueCategories}
        selectCategory={selectCategory}
        onSelectCategory={handleSelectedCategory}
      />
      <Menus menus={filterMenus} />
    </>
  );
}

export default App;
