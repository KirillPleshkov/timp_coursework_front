import React, { useContext, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/UI/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "../api/fetchCategory";
import { authorizationContext } from "../context/AuthorizationContext";
import { tokenContext } from "../context/TokenContext";
import { fetchBasketCreate } from "../api/fetchBasketCreate";

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams();

  const { user, token } = useContext(tokenContext);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["category", categoryId, token],
    queryFn: () => fetchCategory(token, categoryId),
    select: ({ data }) => data,
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { clickHandler, setButtonRef } = useContext(authorizationContext);

  useEffect(() => {
    if (buttonRef) {
      setButtonRef(buttonRef);
    }
  }, [buttonRef]);

  const toBasketHandler = (productId: number) => {
    if (user && token) {
      fetchBasketCreate({ productId }, token).then(() => {
        refetch();
      });
    } else {
      clickHandler();
    }
  };

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div>Загрузка...</div>
      ) : !data?.products || data.products.length === 0 ? (
        <div>Товары не найдены!!!</div>
      ) : (
        <>
          <div>{data.name}</div>
          {data.products.map((elem, index) => (
            <div
              style={{
                display: "flex",
                height: 100,
                width: "80%",
                borderWidth: 1,
                borderColor: "black",
                border: "solid",
                marginBottom: 10,
              }}
              key={index}
            >
              <Link to={`/product/${elem.id}`}>
                <img src={elem.imageUrl} height={90} />
              </Link>
              <Link to={`/product/${elem.id}`}>
                <div>{elem.name}</div>
              </Link>
              {elem.isBasket === true ? (
                <div>Товар в корзине</div>
              ) : (
                <button
                  ref={buttonRef}
                  onClick={() => toBasketHandler(elem.id)}
                >
                  В корзину
                </button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export { CategoryPage };
