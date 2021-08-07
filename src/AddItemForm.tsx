import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
  callback: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      props.callback(title);
    }
  }

  const addTask = (title: string) => {
    if (title.trim() !== "") {
      props.callback(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  return (
    <div>
      <input value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? "error" : ""}
      />
      <button onClick={() => {addTask(title)}}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}