import {memo, useCallback} from 'react';
import s from './TodolistItem.module.css'
import {AddItemForm} from "@/common/components/AddItemForm/AddItemForm.tsx";
import {useDispatch} from "react-redux";
import {addTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {TodoListType} from "@/features/todolists/model/todolists-reducer.ts";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx";

type Props = {
    todolist: TodoListType
}

export const TodolistItem = memo(({todolist}:Props) => {

    console.log('todo was called')

    const dispatch = useDispatch()

    const addNewTask = useCallback((title: string) => {
        dispatch(addTaskAC({taskTitle: title, todolistID: todolist.id}))
    }, [])


    return (
        <div className={s.todoWrapper} key={todolist.id}>
            <div className={s.topContainer}>
                <TodolistTitle todolist={todolist}/>
                <AddItemForm label={'Add task'} addItem={addNewTask}/>
            </div>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    );
})