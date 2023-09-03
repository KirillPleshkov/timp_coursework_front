import React from "react";
import { useInput } from "../hooks/useInput";
import { Link } from "react-router-dom";
import { useSearchCategories } from "../hooks/useSearchCategories";
import { useSearchProducts } from "../hooks/useSearchProducts";

const Search: React.FC = () => {
  const [inputValue, changeHandler] = useInput();

  const { categoriesData, categoriesError, categoriesIsLoading } =
    useSearchCategories(inputValue);

  const { productsData, productsError, productsIsLoading } =
    useSearchProducts(inputValue);

  return (
    <div>
      <input type="text" value={inputValue} onChange={changeHandler} />

      {inputValue && (
        <div style={{ position: "absolute", backgroundColor: "gray" }}>
          <div>Категории</div>
          {categoriesIsLoading ? (
            <div>Загрузка...</div>
          ) : (
            <ul>
              {!categoriesError &&
                categoriesData?.map((elem, index) => (
                  <li key={index}>
                    <Link to={`/category/${elem.id}`}>{elem.name}</Link>
                  </li>
                ))}
            </ul>
          )}

          <div>Товары</div>
          {productsIsLoading ? (
            <div>Загрузка...</div>
          ) : (
            <ul>
              {!productsError &&
                productsData?.map((elem, index) => (
                  <li key={index}>
                    <Link to={`/product/${elem.id}`}>{elem.name}</Link>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export { Search };
