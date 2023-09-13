import React from "react";
import { useInput } from "../hooks/useInput";
import { Link } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";

const Search: React.FC = () => {
  const [inputValue, changeHandler, clear] = useInput();

  const { data, isLoading, isError } = useSearch(inputValue);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <input type="text" value={inputValue} onChange={changeHandler} />
        <button onClick={clear}>X</button>
      </div>

      {inputValue && (
        <div style={{ position: "absolute", backgroundColor: "gray" }}>
          {data?.categories.length === 0 && data.products.length === 0 ? (
            <div>Нет результатов</div>
          ) : (
            <>
              <div>Категории</div>
              {isLoading ? (
                <div>Загрузка...</div>
              ) : (
                <ul>
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

              <div>Товары</div>
              {isLoading ? (
                <div>Загрузка...</div>
              ) : (
                <ul>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export { Search };
