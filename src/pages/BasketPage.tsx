import React, { useContext, useMemo } from "react";
import { Navbar } from "../components/UI/Navbar";
import { tokenContext } from "../context/TokenContext";
import { useQuery } from "@tanstack/react-query";
import { fetchBasketGetAll } from "../api/fetchBasketGetAll";
import Counter from "../components/UI/Counter";

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
      <div>
        <Navbar />
        <h1>Корзина</h1>
        <div>Загрузка...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h1>Корзина</h1>

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
                <img src={elem.product.imageUrl} height={90} />
                <div>{elem.product.name}</div>
                <div>
                  <div>Цена: {elem.product.price}</div>
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
          <div>
            <div>Цена: {fullCost}</div>
            <button>Купить</button>
          </div>
        </div>
      )}
    </div>
  );
};

export { BasketPage };
