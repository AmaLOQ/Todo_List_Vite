import React, {ChangeEvent, memo} from 'react';
import s from "./TaskItem.module.css";
import Checkbox from "@mui/material/Checkbox";
import {EnableSpan} from "@/common/components/EnableSpan/EnableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {getListItem} from "./TaskItem.style.ts";
import {ListItem} from "@mui/material";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "@/features/todolists/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type TaskPropsType = {
    task: TaskType
    todolistID: string
}
export const TaskItem: React.FC <TaskPropsType> = memo(({task, todolistID})=> {

    const dispatch = useAppDispatch()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({taskID: task.id, taskStatus: e.currentTarget.checked, todolistID: todolistID}))
    }
    const onClickDeleteTask = () => {
        dispatch(removeTaskAC({taskID: task.id, todolistID: todolistID}))
    }

    const changeTaskTitle = ((newTaskTitle: string) => {
        dispatch(changeTaskTitleAC({taskID: task.id, taskTitle: newTaskTitle, todolistID: todolistID}))
    })

    return (
        <div className={s.taskDiv}>
            <ListItem key={task.id} sx={getListItem(task.isDone)}>
                <Checkbox size={'small'} checked={task.isDone} onChange={onChange}/>
                <div className={s.taskContainer}>
                    <EnableSpan text={task.task} changeTitle={changeTaskTitle}/>
                    <IconButton style={{padding: '0px'}} onClick={onClickDeleteTask} aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </ListItem>
        </div>
    );
});

