import React, { useEffect, useRef } from "react";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import "../styles/profile_style.css";

interface AuthorizedProfileProps {
  user: { id: number; name: string };
  setToken: ((token: string) => void) | null;
}

const AuthorizedProfile: React.FC<AuthorizedProfileProps> = ({
  user,
  setToken,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const { isOpen, setIsOpen, modalRef, setButtonRef } = useModal<
    HTMLDivElement,
    HTMLButtonElement
  >();

  useEffect(() => {
    if (buttonRef) {
      setButtonRef(buttonRef);
    }
  }, [buttonRef]);

  return (
    <div>
      <button className="profile" ref={buttonRef} onClick={() => setIsOpen(true)}>
        {user?.name}
      </button>
      {isOpen && (
        <div
          ref={modalRef}
          style={{ position: "absolute", backgroundColor: "gray" }}
        >
          <button className="exit_profile"
            onClick={() => {
              setToken && setToken("");
              setIsOpen(false);
              navigate("/");
            }}
          >
            Выход
          </button>
        </div>
      )}
    </div>
  );
};

export { AuthorizedProfile };
