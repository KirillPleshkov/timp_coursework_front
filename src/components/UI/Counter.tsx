import React from "react";
import { fetchBasketUpdate } from "../../api/fetchBasketUpdate";
import { fetchBasketDelete } from "../../api/fetchBasketDelete";

interface CounterProps {
  id: number;
  count: number;
  token: string | null;
  updatePage: () => void;
}

const Counter: React.FC<CounterProps> = ({ count, id, token, updatePage }) => {
  const buttonUpdateHandler = (count: number) => {
    if (count <= 0) return;

    fetchBasketUpdate(id, { count }, token).then(() => {
      updatePage();
    });
  };

  const buttonDeleteHandler = () => {
    fetchBasketDelete(id, token).then(() => {
      updatePage();
    });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <button onClick={() => buttonUpdateHandler(count - 1)}>-</button>
        <div>{count}</div>
        <button onClick={() => buttonUpdateHandler(count + 1)}>+</button>
      </div>
      <button onClick={buttonDeleteHandler}>X</button>
    </div>
  );
};

export default Counter;
