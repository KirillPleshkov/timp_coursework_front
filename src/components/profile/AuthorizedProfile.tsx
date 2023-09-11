import React from "react";
import { useModal } from "../../hooks/useModal";

interface AuthorizedProfileProps {
  user: { id: number; name: string };
  setToken: ((token: string) => void) | null;
}

const AuthorizedProfile: React.FC<AuthorizedProfileProps> = ({
  user,
  setToken,
}) => {
  const { isOpen, setIsOpen, modalRef, buttonRef } = useModal<
    HTMLDivElement,
    HTMLButtonElement
  >();

  return (
    <div>
      <button ref={buttonRef} onClick={() => setIsOpen(true)}>
        {user?.name}
      </button>
      {isOpen && (
        <div
          ref={modalRef}
          style={{ position: "absolute", backgroundColor: "gray" }}
        >
          <button
            onClick={() => {
              setToken && setToken("");
              setIsOpen(false);
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
