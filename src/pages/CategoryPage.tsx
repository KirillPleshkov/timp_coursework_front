import React, { useContext, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/UI/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "../api/fetchCategory";
import { authorizationContext } from "../context/AuthorizationContext";
import { tokenContext } from "../context/TokenContext";
import { fetchBasketCreate } from "../api/fetchBasketCreate";
import "./style_basket.css";
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
          <div className="text_data_name">{data.name}</div>
          {data.products.map((elem, index) => (
            <div className={"journal_entry" + " " + "journal_entry_image" } key={index}>
              <div className="size_image">
                <Link to={`/product/${elem.id}`}>
                  <img className="img_journal" src={elem.imageUrl} height={90} />
                </Link>
              </div>
              <div className="product_elem">
                <Link to={`/product/${elem.id}`}>
                  <div>{elem.name}</div>
                </Link>
              </div>
              {elem.isBasket === true ? (
                <div className="thing_in_basket_text">В корзине</div>
              ) : (
                <button className="button_basket"
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
