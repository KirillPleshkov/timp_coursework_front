import React, { useContext, useRef } from "react";
import { Navbar } from "../components/UI/Navbar";
import { fetchProducts } from "../api/fetchProducts";
import { tokenContext } from "../context/TokenContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchBasketCreate } from "../api/fetchBasketCreate";
import { authorizationContext } from "../context/AuthorizationContext";

const HomePage: React.FC = () => {
  const { user, token } = useContext(tokenContext);

  const { clickHandler, setButtonRef } = useContext(authorizationContext);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", token],
    queryFn: () => fetchProducts(token),
    select: ({ data }) => data,
  });

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
      <div style={{ marginTop: 50 }}></div>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : data?.length === 0 ? (
        <div>Товары не найдены!!!</div>
      ) : (
        <>
          {/* <div className="text_data_name">{data.name}</div> */}
          {data?.map((elem, index) => (
            <div
              className={"journal_entry" + " " + "journal_entry_image"}
              key={index}
            >
              <div className="size_image">
                <Link to={`/product/${elem.id}`}>
                  <img
                    className="img_journal"
                    src={elem.imageUrl}
                    height={90}
                  />
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
                <button
                  className="button_basket"
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

export default HomePage;
