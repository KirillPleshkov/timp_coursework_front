import React, { useRef, useState } from "react";
import { TypeAssistant, fetchAssistant } from "../api/fetchAssistant";
import { Link } from "react-router-dom";
import "./styles/assistant.css";
// import SendImage from "./UI/PhotoRoom_20230916_021219.jpg" ;

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
        <div className="btn_accictent_window">
          <div className="form_assistant"
            style={{
              height: 350,
            }}
          >
            <button className="bnt_clearAccictent"  onClick={clearAssistant}>
              X
            </button>
            <div style={{ left: 10, position: "relative" }}>
              Здарова. Какая проблема?
            </div>

            {messageHistory.map((elem, index) => (
              <div key={index}>
                <div className="respons_message" >{elem.response}</div>
                {elem.request === "error" ? (
                  <div style={{ left: 10, position: "relative" }}>Данный симптом не найден</div>
                ) : (
                  <div style={{ left: 10, position: "relative" }}>
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
          <form className="form_message" onSubmit={submitHandler} style={{ display: "flex" }}>
            <input className="input_message" ref={inputRef} />
            {/*<img src={SendImage}/>*/}
            <button className="btn_message" type="submit">Отправить</button>
          </form>
        </div>
      ) : (
        <div className="assistant" onClick={() => setIsVisible(true)}>
          Ассистент
        </div>
      )}
    </>
  );
};

export { Assistant };
