import React from "react";
import { useModal } from "../../hooks/useModal";

const Login: React.FC = () => {

  const { isOpen, setIsOpen, modalRef } = useModal<
    HTMLDivElement,
    HTMLButtonElement
  >(); 

  return (<>
    {

    }
  </>);
};

export default Login;
