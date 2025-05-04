import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import s from "./AddItemForm.module.css"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import AddBox from "@mui/icons-material/AddBox"

type AddItemFormPropsType = {
  addItem: (title: string) => void
  label: string
}

export function capitalizeFirstLetter(str: string) {
  // Проверка на пустую строку
  if (str.length === 0) {
    return str
  }
  // Преобразование первой буквы в верхний регистр и конкатенация с остальной частью строки
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const AddItemForm: React.FC<AddItemFormPropsType> = memo((props) => {
  console.log("addItem was called")
  const { label, addItem } = props

  const [error, setError] = useState<null | string>(null)
  const [newTaskTitle, setNewTaskTitle] = useState<string>("")

  const onClickAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      const correctTaskTitle = capitalizeFirstLetter(newTaskTitle)
      addItem(correctTaskTitle.trim())
      setNewTaskTitle("")
    } else {
      setError("Add symbol")
      setNewTaskTitle("")
    }
  }

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
    if (error !== null) {
      setError(null)
    }
  }
  const createItemOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (newTaskTitle.trim() !== "" && e.charCode === 13) {
      onClickAddTask()
    }
    // if () {
    //     addItem(newTaskTitle.trim())
    //     setNewTaskTitle('')
    // } else if (e.charCode === 13) {
    //     setError('Add symbol')
    // }
  }
  const onBlurChangeError = () => {
    if (error !== null) {
      setError(null)
    }
  }

  return (
    <div className={s.addItemFormWrapper}>
      <TextField
        color={"primary"}
        size={"small"}
        variant={"outlined"}
        label={error ? "Title is required" : label}
        id={"outlined-basic"}
        value={newTaskTitle}
        type="text"
        onBlur={onBlurChangeError}
        onChange={changeTitleHandler}
        onKeyPress={createItemOnEnterHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton
        size={"medium"}
        style={{ display: "inline-flex", padding: "4px", alignItems: "center" }}
        onClick={onClickAddTask}
        color={"primary"}
      >
        <AddBox fontSize={"large"} />
      </IconButton>
    </div>
  )
})
