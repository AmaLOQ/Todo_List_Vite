import React, {ChangeEvent, memo, useCallback} from 'react';
import s from "./Task.module.css";
import Checkbox from "@mui/material/Checkbox";
import {EnableSpan} from "../EnableSpan/EnableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {getListItem} from "./Tasks.style";
import {ListItem} from "@mui/material";
type TaskType = {
    id: string,
    task: string,
    isDone: boolean
}
type TaskPropsType = {
    task: TaskType
    onChange: (isDone: boolean) => void
    onClickDeleteTask: () => void
    onClickChangeTaskTitle: (newTitle: string) => void
}
export const Task: React.FC <TaskPropsType> = memo((props)=> {
    const {task, onChange, onClickDeleteTask, onClickChangeTaskTitle} = props

    const onChangeTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.checked)
    }, [task.isDone])

    const onClickDeleteTaskHandler = useCallback(()=> {
        onClickDeleteTask()
    }, [])

    const onClickChangeHandler = useCallback((newTitle: string)=> {
        onClickChangeTaskTitle(newTitle)
    }, [])

    return (
        <div className={s.taskDiv}>
            <ListItem key={task.id} sx={getListItem(task.isDone)}>
                <Checkbox size={'small'} checked={task.isDone} onChange={onChangeTask}/>
                <div className={s.taskContainer}>
                    <EnableSpan text={task.task} changeTitle={onClickChangeHandler}/>
                    <IconButton style={{padding: '0px'}} onClick={onClickDeleteTaskHandler} aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </ListItem>
        </div>
    );
});

