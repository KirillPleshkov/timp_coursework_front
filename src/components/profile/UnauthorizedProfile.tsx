import React, { useContext, useEffect, useRef } from "react";
import { authorizationContext } from "../../context/AuthorizationContext";

const UnauthorizedProfile: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { clickHandler, setButtonRef } = useContext(authorizationContext);

  useEffect(() => {
    if (buttonRef) {
      setButtonRef(buttonRef);
    }
  }, [buttonRef]);

  return (
    <div>
      <button ref={buttonRef} onClick={clickHandler}>
        Профиль
      </button>
    </div>
  );
};

export { UnauthorizedProfile };
