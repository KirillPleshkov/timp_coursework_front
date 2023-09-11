import React, { FormEvent, useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { fetchLogin } from "../../api/fetchLogin";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { fetchRegistration } from "../../api/fetchRegistration";

interface UnauthorizedProfileProps {
  setToken: ((token: string) => void) | null;
}

const UnauthorizedProfile: React.FC<UnauthorizedProfileProps> = ({
  setToken,
}) => {
  const { isOpen, setIsOpen, modalRef, buttonRef } = useModal<
    HTMLDivElement,
    HTMLButtonElement
  >();

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

  return (
    <div>
      <button ref={buttonRef} onClick={() => setIsOpen((prev) => !prev)}>
        Профиль
      </button>
      {isOpen && isLogin && (
        <div
          ref={modalRef}
          style={{
            position: "absolute",
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
            position: "absolute",
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
    </div>
  );
};

export { UnauthorizedProfile };
