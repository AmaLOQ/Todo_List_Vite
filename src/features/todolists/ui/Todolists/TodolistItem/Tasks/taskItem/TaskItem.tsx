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

type props = {
  task: DomainTask
  todolistId: string
}
export const TaskItem: React.FC<props> = memo(({ task, todolistId }) => {
  const dispatch = useAppDispatch()

  const onClickDeleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }))
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTaskStatus = e.currentTarget.checked
    dispatch(
      updateTaskTC({
        taskId: task.id,
        todolistId,
        domainModel: { status: newTaskStatus ? TaskStatus.Completed : TaskStatus.New },
      }),
    )
  }

  const changeTaskTitle = (newTaskTitle: string) => {
    dispatch(updateTaskTC({ taskId: task.id, todolistId, domainModel: { title: newTaskTitle } }))
  }

  const isTaskCompleted = task.status === TaskStatus.Completed

  return (
    <div className={s.taskDiv}>
      <ListItem key={task.id} sx={getListItem(isTaskCompleted)}>
        <Checkbox size={"small"} checked={isTaskCompleted} onChange={onChange} />
        <div className={s.taskContainer}>
          <EnableSpan text={task.title} changeTitle={changeTaskTitle} />
          <IconButton style={{ padding: "0px" }} onClick={onClickDeleteTask} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </div>
      </ListItem>
    </div>
  )
})
