import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
  callback: (title: string) => void
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }

    if (e.charCode === 13) {
      props.callback(title);
      setTitle("");
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
      <TextField value={title}
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
                 variant="outlined"
                 error={!!error}
                 label="Title"
                 helperText={error}
      />
      <IconButton color="primary" onClick={() => {
        addTask(title)
      }}>
        <AddBox/>
      </IconButton>
    </div>
  )
})