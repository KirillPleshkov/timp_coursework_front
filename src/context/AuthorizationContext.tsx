import React, {
  FormEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useModal } from "../hooks/useModal";
import { fetchLogin } from "../api/fetchLogin";
import { AxiosError } from "axios";
import { fetchRegistration } from "../api/fetchRegistration";
import { tokenContext } from "./TokenContext";
import "./auth_style.css";

export const authorizationContext = createContext<{
  isOpen: boolean;
  clickHandler: () => void;
  setButtonRef: (buttonRef: React.RefObject<HTMLButtonElement>) => void;
}>({
  isOpen: false,
  clickHandler: () => {},
  setButtonRef: (buttonRef: React.RefObject<HTMLButtonElement>) => {},
});

type AuthorizationContextProps = {
  children: ReactNode;
};

const AuthorizationContext: React.FC<AuthorizationContextProps> = ({
  children,
}) => {
  const { isOpen, setIsOpen, modalRef, setButtonRef } = useModal<
    HTMLDivElement,
    HTMLButtonElement
  >();

  const { setToken } = useContext(tokenContext);

  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  const submitLoginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = await fetchLogin({
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      });

      setToken && setToken(token.data.token);

      setIsOpen(false);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message);
      }
    }
  };

  const submitRegistrationHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = await fetchRegistration({
        email: e.currentTarget.email.value,
        name: e.currentTarget.namee.value,
        password: e.currentTarget.password.value,
      });

      setToken && setToken(token.data.token);

      setIsOpen(false);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message[0]);
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setIsLogin(true);
    }
  }, [isOpen]);

  const clickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <authorizationContext.Provider
      value={{ isOpen, clickHandler, setButtonRef }}
    >
      {children}
      {isOpen && isLogin && (
        <div className="auth_form" ref={modalRef} >
          <form onSubmit={submitLoginHandler}>
            <div className="auth_form" >
              <div className="text_title">Авторизация</div>
              <div>Почта</div>
              <input className="style_input" name="email" />
              <div>Пароль</div>
              <input className="style_input" type="password" name="password" />
              <div className="text_error">{error}</div>
              <button className="btn_send">Отправить</button>
              <div className="text_article" onClick={() => setIsLogin(false)}>У вас нет аккаунта?</div>
            </div>
          </form>
        </div>
      )}

      {isOpen && !isLogin && (
        <div className="auth_form"
          ref={modalRef}

        >
          <form onSubmit={submitRegistrationHandler}>
            <div>
              <div className="text_title">Регистрация</div>
              <div>Имя</div>
              <input className="style_input" name="namee" />
              <div>Почта</div>
              <input className="style_input" name="email" />
              <div>Пароль</div>
              <input  className="style_input" type="password" name="password" />
              <div className="text_error">{error}</div>
              <button className="btn_send">Отправить</button>
              <div className="text_article" onClick={() => setIsLogin(true)}>Авторизация</div>
            </div>
          </form>
        </div>
      )}
    </authorizationContext.Provider>
  );
};

export { AuthorizationContext };
