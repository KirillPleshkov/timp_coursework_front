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
        <div
          ref={modalRef}
          style={{
            position: "fixed",
            backgroundColor: "gray",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <form onSubmit={submitLoginHandler}>
            <div>
              <div>Авторизация</div>
              <div>Почта</div>
              <input name="email" />
              <div>Пароль</div>
              <input name="password" />
              <div>{error}</div>
              <button>Отправить</button>
              <div onClick={() => setIsLogin(false)}>Регистрация</div>
            </div>
          </form>
        </div>
      )}

      {isOpen && !isLogin && (
        <div
          ref={modalRef}
          style={{
            position: "fixed",
            backgroundColor: "gray",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <form onSubmit={submitRegistrationHandler}>
            <div>
              <div>Регистрация</div>
              <div>Имя</div>
              <input name="namee" />
              <div>Почта</div>
              <input name="email" />
              <div>Пароль</div>
              <input name="password" />
              <div>{error}</div>
              <button>Отправить</button>
              <div onClick={() => setIsLogin(true)}>Авторизация</div>
            </div>
          </form>
        </div>
      )}
    </authorizationContext.Provider>
  );
};

export { AuthorizationContext };
