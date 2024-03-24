import React from "react";
import { useInput } from "../hooks/useInput";
import { Link } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import "./styles/search.css";
const Search: React.FC = () => {
  const [inputValue, changeHandler, clear] = useInput();

  const { data, isLoading, isError } = useSearch(inputValue);

  return (
    <div>
      <div style={{ display: "flex", height: "20px", padding: "6px" }}>
        <input type="text" value={inputValue} onChange={changeHandler} />
        <button className="clear" onClick={clear}>
          Очистить
        </button>
      </div>

      {inputValue && (
        <div className="dropdown">
          {data?.categories.length === 0 && data.products.length === 0 ? (
            <div>Нет результатов</div>
          ) : (
            <div>
              <div className="title_category">Категории</div>
              {isLoading ? (
                <div>Загрузка...</div>
              ) : (
                <ul className="body_text">
                  {!isError &&
                    data?.categories?.map((elem, index) => (
                      <li key={index}>
                        <Link to={`/category/${elem.id}`} onClick={clear}>
                          {elem.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}

              <div className="title_category">Товары</div>
              {isLoading ? (
                <div>Загрузка...</div>
              ) : (
                <ul className="body_text">
                  {!isError &&
                    data?.products?.map((elem, index) => (
                      <li key={index}>
                        <Link to={`/product/${elem.id}`} onClick={clear}>
                          {elem.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { Search };
