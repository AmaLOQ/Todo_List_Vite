import React, { ChangeEvent, memo } from "react"
import s from "./TaskItem.module.css"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItem } from "./TaskItem.style.ts"
import { ListItem } from "@mui/material"
import { deleteTaskTC, updateTaskTC } from "@/features/todolists/model/tasks-slice.ts"
import { EnableSpan } from "@/common/components"
import { useAppDispatch } from "@/common/hooks"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

type props = {
  task: DomainTask
  todolist: DomainTodolist
}
export const TaskItem: React.FC<props> = memo(({ task, todolist }) => {
  const dispatch = useAppDispatch()

  const onClickDeleteTask = () => {
    dispatch(deleteTaskTC({ todolistId: todolist.id, taskId: task.id }))
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTaskStatus = e.currentTarget.checked
    dispatch(
      updateTaskTC({
        taskId: task.id,
        todolistId: todolist.id,
        domainModel: { status: newTaskStatus ? TaskStatus.Completed : TaskStatus.New },
      }),
    )
  }

  const changeTaskTitle = (newTaskTitle: string) => {
    dispatch(updateTaskTC({ taskId: task.id, todolistId: todolist.id, domainModel: { title: newTaskTitle } }))
  }

  const isTaskCompleted = task.status === TaskStatus.Completed
  const isDisabled = todolist.entityStatus === "loading"

  return (
    <div className={s.taskDiv}>
      <ListItem key={task.id} sx={getListItem(isTaskCompleted)}>
        <Checkbox size={"small"} checked={isTaskCompleted} onChange={onChange} disabled={isDisabled} />
        <div className={s.taskContainer}>
          <EnableSpan text={task.title} changeTitle={changeTaskTitle} disabled={isDisabled} />
          <IconButton style={{ padding: "0px" }} onClick={onClickDeleteTask} aria-label="delete" disabled={isDisabled}>
            <DeleteIcon />
          </IconButton>
        </div>
      </ListItem>
    </div>
  )
})
