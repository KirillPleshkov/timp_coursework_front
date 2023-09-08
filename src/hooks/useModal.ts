import { useEffect, useRef, useState } from "react";

const useModal = <T extends HTMLElement, L extends HTMLElement>() => {
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef<T>(null);
  const buttonRef = useRef<L>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        isOpen &&
        !modalRef.current?.contains(e.target) &&
        !buttonRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen, modalRef, buttonRef };
};

export { useModal };
