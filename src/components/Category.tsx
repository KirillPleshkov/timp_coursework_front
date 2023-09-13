import React, { useEffect, useRef } from "react";
import { useCategoriesName } from "../hooks/useCategoriesName";
import { Link } from "react-router-dom";
import { useModal } from "../hooks/useModal";

const Category: React.FC = () => {
  const { data, isLoading } = useCategoriesName();

  const buttonRef = useRef<HTMLButtonElement>(null);

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
      <button ref={buttonRef} onClick={() => setIsOpen((prev) => !prev)}>
        Категории
      </button>
      <div ref={modalRef}>
        {isOpen && (
          <div style={{ position: "absolute", backgroundColor: "gray" }}>
            {isLoading ? (
              <div>Загрузка...</div>
            ) : (
              <ul>
                {data?.map((elem, index) => (
                  <li key={index}>
                    <Link
                      to={`/category/${elem.id}`}
                      onClick={() => setIsOpen((prev) => !prev)}
                    >
                      {elem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { Category };
