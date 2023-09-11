import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/UI/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/fetchProduct";

const ProductPage: React.FC = () => {
  const { productId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    select: ({ data }) => data,
  });

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
          <button>В корзину</button>
        </div>
      </div>
      <div>
        <h1>Описание</h1>
        <div>{data?.description}</div>
      </div>
    </div>
  );
};

export { ProductPage };
