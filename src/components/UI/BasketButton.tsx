import React, { useContext, useEffect, useRef } from "react";
import { tokenContext } from "../../context/TokenContext";
import { authorizationContext } from "../../context/AuthorizationContext";
import { useNavigate } from "react-router-dom";

const BasketButton: React.FC = () => {
  const { user } = useContext(tokenContext);

  const navigate = useNavigate();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { clickHandler, setButtonRef } = useContext(authorizationContext);

  useEffect(() => {
    if (buttonRef) {
      setButtonRef(buttonRef);
    }
  }, [buttonRef]);

  const toBasketHandler = () => {
    if (user) {
      navigate("/basket");
    } else {
      clickHandler();
    }
  };

  return (
    <button className="btn_basket" ref={buttonRef} onClick={toBasketHandler}>
      Корзина
    </button>
  );
};

export default BasketButton;
