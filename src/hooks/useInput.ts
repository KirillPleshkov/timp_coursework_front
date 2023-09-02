import { useState } from "react"


function useInput(initialValue = ''): [
  string, React.ChangeEventHandler<HTMLInputElement>
] {
  const [value, setValue] = useState<string>(initialValue)

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  return [value, changeHandler]
}

export {useInput}