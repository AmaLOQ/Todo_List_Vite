import s from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {EnableSpan} from "@/common/components/EnableSpan/EnableSpan.tsx";
import {useCallback} from "react";
import {changeTodoListTitleAC, removeTodoListAC, TodoListType} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props =  {
    todolist: TodoListType
}

export const TodolistTitle = ( {todolist}: Props) => {

    const {id, title} = todolist

    const dispatch = useAppDispatch();

    const onClickChangeTodolistTitle = useCallback((newTitle: string) => {
        dispatch(changeTodoListTitleAC({todoListID: id, todoListTitle: newTitle}))
    }, [])

    const onClickDeleteTodolist = useCallback(() => {
        dispatch(removeTodoListAC({todoListID: id}))
    }, [])

    return (
        <>
            <div className={s.deleteIconWrapper}>
                <IconButton onClick={onClickDeleteTodolist} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </div>
            <h3 className={s.todoListTitle}><EnableSpan text={title} changeTitle={onClickChangeTodolistTitle}/></h3>
        </>

    );
};

