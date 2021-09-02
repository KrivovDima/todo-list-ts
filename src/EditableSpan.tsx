import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
  title: string
  onChange: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log("EditableSpan")
  let [edit, setEdit] = useState(false);
  let [value, setValue] = useState('');

  const activateEditMode = () => {
    setEdit(true);
    setValue(props.title);
  }

  const activateViewMode = () => {
    setEdit(false);
    props.onChange(value);
  }

  const onChangeEditableSpan = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  }

  return (
    edit ?
      <TextField
        value={value}
        autoFocus onBlur={activateViewMode}
        onChange={onChangeEditableSpan}
        variant="outlined"
      />
      :
      <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
})