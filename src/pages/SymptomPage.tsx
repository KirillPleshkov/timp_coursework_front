import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchSymptom } from "../api/fetchSymptom";
import { Navbar } from "../components/UI/Navbar";

const SymptomPage: React.FC = () => {
  const { symptomId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["symptom", symptomId],
    queryFn: () => fetchSymptom(symptomId),
    select: ({ data }) => data,
  });

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
              <img src={elem.imageUrl} height={90} />
              <div>{elem.name}</div>
              <button>В корзину</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SymptomPage;
