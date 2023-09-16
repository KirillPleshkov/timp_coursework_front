import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/UI/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/fetchProduct";
import { tokenContext } from "../context/TokenContext";
import { fetchBasketCreate } from "../api/fetchBasketCreate";
import { authorizationContext } from "../context/AuthorizationContext";
import './style_basket.css';
import "./style_productage.css";
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
    <div className="form_product">
      <Navbar />
      <div className="text_data_name">{data?.name}</div>
      <div style={{ display: "flex" }}>
        <img className="img_product" src={data?.imageUrl} style={{ width: 200 }} />
        <div>
          <div className="text_disc" ><b>Действующее вещество </b> - {data?.activeSubstance}</div>
          <div className="text_disc"><b>Производитель </b>- {data?.maker}</div>
          <div className="text_disc"><b>Цена:</b> {data?.price}₽</div>

          <div>
            {data?.isBasket === true ? (
                <div className={"thing_in_basket_text" }>В корзине</div>
            ) : (
                <button className={"button_basket"}
                    ref={buttonRef}
                    onClick={() => data && toBasketHandler(data?.id)}
                >
                  В корзину
                </button>
            )}
          </div>

        </div>

      </div>
      <div className="text_body_all">
        <h1>Описание</h1>
        <div className="text_body_product">{data?.description}</div>
        <h1>Показания к применению</h1>
        <div className="text_body_product">{data?.indicationsForUse}</div>
        <h1>Противопоказания</h1>
        <div className="text_body_product">{data?.contraindications}</div>
        <h1>Способ применения и дозы</h1>
        <div className="text_body_product">{data?.applicationMethod}</div>
        <h1>Срок годности</h1>
        <div className="text_body_product"> {data?.shelfLife}</div>
      </div>
    </div>
  );
};

export { ProductPage };
