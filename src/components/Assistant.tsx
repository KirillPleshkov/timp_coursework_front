import React, { useRef, useState } from "react";
import { TypeAssistant, fetchAssistant } from "../api/fetchAssistant";
import { Link } from "react-router-dom";

type TypeMessageHistory = {
  response: string;
  request: TypeAssistant | "error";
};

const Assistant: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [messageHistory, setMessageHistory] = useState<TypeMessageHistory[]>(
    []
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    let symptom: string;

    const titleCase = (str: string) => {
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    };

    if (inputRef.current) {
      symptom = titleCase(inputRef.current.value);
      inputRef.current.value = "";
    } else {
      symptom = "";
    }

    const { data } = await fetchAssistant(symptom);

    if (typeof data === "string") {
      setMessageHistory((prev) => [
        ...prev,
        { response: symptom, request: "error" },
      ]);
    } else {
      setMessageHistory((prev) => [
        ...prev,
        { response: symptom, request: { id: data.id } },
      ]);
    }
  };

  const clearAssistant = () => {
    setMessageHistory([]);
    setIsVisible(false);
  };

  return (
    <>
      {isVisible ? (
        <div
          style={{
            position: "fixed",
            right: 10,
            bottom: 10,
            backgroundColor: "grey",
            width: 350,
            height: 400,
          }}
        >
          <div
            style={{
              height: 350,
            }}
          >
            <button style={{ marginLeft: "93%" }} onClick={clearAssistant}>
              X
            </button>
            <div style={{ left: 10, position: "relative" }}>
              Здарова. Какая проблема?
            </div>

            {messageHistory.map((elem, index) => (
              <div key={index}>
                <div>{elem.response}</div>
                {elem.request === "error" ? (
                  <div>Данный симптом не найден</div>
                ) : (
                  <div>
                    Для лечения данного симптома найдены лекарства для их
                    просмотра перейдите по{" "}
                    <Link
                      to={`/symptom/${elem.request.id}`}
                      onClick={clearAssistant}
                    >
                      ссылке
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={submitHandler} style={{ display: "flex" }}>
            <input ref={inputRef} />
            <button type="submit">О</button>
          </form>
        </div>
      ) : (
        <div
          style={{
            position: "fixed",
            right: 10,
            bottom: 10,
            backgroundColor: "green",
          }}
          onClick={() => setIsVisible(true)}
        >
          Ассистент
        </div>
      )}
    </>
  );
};

export { Assistant };
