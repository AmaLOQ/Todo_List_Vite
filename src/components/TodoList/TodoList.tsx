import React, {memo, useCallback} from 'react';
import s from './TodoList.module.css'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EnableSpan} from "../EnableSpan/EnableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from "../../model/task-reducer";
import {Task} from "../Task/Task";
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterType,
    removeTodoListAC,
    TodoListType
} from "../../model/todolists-reducer";
import {useAppSelector} from "../../common/hooks/useAppSelector.ts";
import {selectTasks} from "../../model/tasks-selectors.ts";

const getFilteredTasks = (tasks: TasksType[], filter: FilterType): TasksType[] => {
    if (filter === 'Active') return tasks.filter((t) => !t.isDone)
    if (filter === 'Completed') return tasks.filter((t) => t.isDone)
    return tasks
}

export const TodoList: React.FC<TodoListType> = memo((props) => {
    const {id, title, filter,} = props
    console.log('todo was called')

    const tasks = useAppSelector(selectTasks)

    const dispatch = useDispatch()

    const onClickChangeFilter = useCallback((filter: FilterType, todoListID: string) => {
        dispatch(changeTodoListFilterAC({todoListID, filter}))
    }, [])

    const onClickDeleteTodoList = useCallback(() => {
        dispatch(removeTodoListAC({todoListID: id}))
    }, [])

    const addNewTask = useCallback((title: string) => {
        dispatch(addTaskAC({taskTitle: title, todolistID: id}))
    }, [])

    const filteredTasks = getFilteredTasks(tasks[id], filter)

    const mappedTasks = filteredTasks.map((t) => {

        const onChange = (isDone: boolean) => {
            dispatch(changeTaskStatusAC({taskID: t.id, taskStatus: isDone, todolistID: id}))
        }
        const onClickDeleteTask = () => {
            dispatch(removeTaskAC({taskID: t.id, todolistID: id}))
        }

        const changeTaskTitle = ((newTaskTitle: string) => {
            dispatch(changeTaskTitleAC({taskID: t.id, taskTitle: newTaskTitle, todolistID: id}))
        })
        return (
            <div>
                <Task key={t.id} task={t} onChange={onChange}
                       onClickDeleteTask={onClickDeleteTask}
                       onClickChangeTaskTitle={changeTaskTitle}
                />
            </div>
        );
    })

    const onClickChangeTodoListTitle = useCallback((newTitle: string) => {
        dispatch(changeTodoListTitleAC({todoListID: id, todoListTitle:newTitle}))
    }, [])

    return (
        <div className={s.todoWrapper} key={id}>
            <div className={s.topContainer}>
                <div className={s.deleteIconWrapper}>
                    <IconButton onClick={onClickDeleteTodoList} aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </div>
                <h3 className={s.todoListTitle}><EnableSpan text={title} changeTitle={onClickChangeTodoListTitle}/></h3>
                <AddItemForm label={'Add task'} addItem={addNewTask}/>
            </div>
            <div className={s.tasksWrapper}>
                {
                    tasks[id].length === 0
                        ? <p className={s.noTasksText}>Тасок нет</p>
                        : mappedTasks
                }
            </div>
            <div className={s.buttonContainer}>
                <Button
                    size={'small'}
                    color={filter === 'All' ? 'primary': 'inherit'}
                    variant={filter === 'All' ? 'outlined' : 'text'}
                    onClick={useCallback(() => onClickChangeFilter('All', id), [])
                    }>All
                </Button>

                <Button
                    size={'small'}
                    color={filter === 'Active' ? 'primary': 'inherit'}
                    variant={filter === 'Active' ? 'outlined' : 'text'}
                    onClick={useCallback(() => onClickChangeFilter('Active', id), [])
                    }>Active
                </Button>
                <Button
                    size={'small'}
                    color={filter === 'Completed' ? 'primary': 'inherit'}
                    variant={filter === 'Completed' ? 'outlined' : 'text'}
                    onClick={useCallback(() => onClickChangeFilter('Completed', id), [])
                    }>Completed
                </Button>
            </div>
        </div>
    );
})


