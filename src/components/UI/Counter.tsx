import React from "react";
import { fetchBasketUpdate } from "../../api/fetchBasketUpdate";
import { fetchBasketDelete } from "../../api/fetchBasketDelete";
import "./styles/header.css";

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

      <div className="btn_counter">
        <button className="count" onClick={() => buttonUpdateHandler(count - 1)}>-</button>
        <div className="count_text">{count}</div>
        <button className="count" onClick={() => buttonUpdateHandler(count + 1)}>+</button>
        <button className="count_close" onClick={buttonDeleteHandler}>X</button>
      </div>


  );
};

export default Counter;
