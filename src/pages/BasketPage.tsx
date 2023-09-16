import React, { useContext, useMemo } from "react";
import { Navbar } from "../components/UI/Navbar";
import { tokenContext } from "../context/TokenContext";
import { useQuery } from "@tanstack/react-query";
import { fetchBasketGetAll } from "../api/fetchBasketGetAll";
import Counter from "../components/UI/Counter";
import './style_basket.css';
const BasketPage: React.FC = () => {
  const { user, token } = useContext(tokenContext);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["basket", token],
    queryFn: () => fetchBasketGetAll(token),
    select: ({ data }) => data,
  });

  const updatePage = () => {
    refetch();
  };

  const fullCost = useMemo(
    () =>
      data?.reduce((prev, curr) => prev + curr.count * curr.product.price, 0),
    [data]
  );

  if (isLoading) {
    return (
      <div className="btn_basket">
        <Navbar />
        <h1>Корзина</h1>
        <div>Загрузка...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1 className="title_journal">Корзина</h1>

      {data?.length === 0 ? (
        <div>Корзина пуста</div>
      ) : (
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "60%",
            }}
          >
            {data?.map((elem, index) => (
              <div className="journal_entry"
                key={index}
              >
                  <div className="size_image"> <img className="img_journal" src={elem.product.imageUrl} height={90} /> </div>
                <div className="product_elem">{elem.product.name}</div>
                <div>
                  <div className="price_basket" >Цена: {elem.product.price}₽</div>
                  <Counter
                    count={elem.count}
                    id={elem.id}
                    token={token}
                    updatePage={updatePage}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="price_send_together">
            <div className="all_price">Цена: {fullCost}₽</div>
            <button className="btn_basket_all">Купить</button>
          </div>
        </div>
      )}
    </div>
  );
};

export { BasketPage };
