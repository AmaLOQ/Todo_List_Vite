import React, {ChangeEvent, memo, useState} from 'react';
import {capitalizeFirstLetter} from "../AddItemForm/AddItemForm";
import TextField from "@mui/material/TextField";
type EnableSpanPropsType = {
    text: string
    changeTitle: (newTitle: string) => void
}

export const EnableSpan: React.FC<EnableSpanPropsType> = memo((props) => {
    console.log('edit was called')
    const {text, changeTitle} = props
    const [changeMode, setChangeMode] = useState<boolean>(false)
    const [newTaskTitle, setNewTaskTitle] = useState<string>(text)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onDoubleClickChangeMode = () => {
        setChangeMode(true)
    }

    const onBlurChangeTask = () => {
        if(newTaskTitle.trim() !== '') {
            let correctTitle = capitalizeFirstLetter(newTaskTitle)
            changeTitle(correctTitle.trim())
        } else {
            changeTitle(text)
        }
        setChangeMode(false)
    }
    return(
        changeMode
            ? <TextField
                color={'primary'}
                size={'small'}
                autoFocus={true}
                value={newTaskTitle}
                type={'text'}
                placeholder={'Введите текст'}
                onChange={onChangeHandler}
                onBlur={onBlurChangeTask}
            />
            : <span onDoubleClick={onDoubleClickChangeMode}>{text}</span>
    );
})

