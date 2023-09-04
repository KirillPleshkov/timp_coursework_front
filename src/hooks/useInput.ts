import { useState } from "react";

function useInput(
  initialValue = ""
): [string, React.ChangeEventHandler<HTMLInputElement>, () => void] {
  const [value, setValue] = useState<string>(initialValue);

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const clear = () => {
    setValue("");
  };

  return [value, changeHandler, clear];
}

export { useInput };
