import React from "react";
import { useModal } from "../../hooks/useModal";

interface UnauthorizedProfileProps {}

const UnauthorizedProfile: React.FC<UnauthorizedProfileProps> = () => {

  const { isOpen, setIsOpen, modalRef, buttonRef } = useModal<
    HTMLDivElement,
    HTMLButtonElement
  >();

  return (
    <div>
      
    </div>
  );
};

export { UnauthorizedProfile };
