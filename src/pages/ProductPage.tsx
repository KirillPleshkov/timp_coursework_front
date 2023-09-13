import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/UI/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/fetchProduct";
import { tokenContext } from "../context/TokenContext";
import { fetchBasketCreate } from "../api/fetchBasketCreate";
import { authorizationContext } from "../context/AuthorizationContext";

const ProductPage: React.FC = () => {
  const { productId } = useParams();

  const { user, token } = useContext(tokenContext);

  const { clickHandler, setButtonRef } = useContext(authorizationContext);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["product", productId, token],
    queryFn: () => fetchProduct(token, productId),
    select: ({ data }) => data,
  });

  console.log(data);

  const buttonRef = useRef<HTMLButtonElement>(null);

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

  if (isLoading) {
    return (
      <div>
        <Navbar />
        Загрузка...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div>{data?.name}</div>
      <div style={{ display: "flex" }}>
        <img src={data?.imageUrl} style={{ width: 200 }} />
        <div>
          <div>Действующее вещество - {data?.activeSubstance}</div>
          <div>Производитель - {data?.maker}</div>
        </div>
        <div>
          <div>Цена - {data?.price}</div>
          {data?.isBasket === true ? (
            <div>Товар в корзине</div>
          ) : (
            <button
              ref={buttonRef}
              onClick={() => data && toBasketHandler(data?.id)}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
      <div>
        <h1>Описание</h1>
        <div>{data?.description}</div>
        <h1>Показания к применению</h1>
        <div>{data?.indicationsForUse}</div>
        <h1>Противопоказания</h1>
        <div>{data?.contraindications}</div>
        <h1>Способ применения и дозы</h1>
        <div>{data?.applicationMethod}</div>
        <h1>Срок годности</h1>
        <div>{data?.shelfLife}</div>
      </div>
    </div>
  );
};

export { ProductPage };
