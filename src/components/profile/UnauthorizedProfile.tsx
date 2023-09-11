import React from "react";

interface UnauthorizedProfileProps {}

const UnauthorizedProfile: React.FC<UnauthorizedProfileProps> = () => {

  const { isOpen, setIsOpen, modalRef, buttonRef } = useModal<
    HTMLDivElement,
    HTMLButtonElement
  >();

  return (
    <div>
      <button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Профиль
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

export { UnauthorizedProfile };
