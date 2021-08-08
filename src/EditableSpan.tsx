import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
  title: string
  onChange: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
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
      <input
        value={value}
        autoFocus onBlur={activateViewMode}
        onChange={onChangeEditableSpan}
      />
      :
      <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}