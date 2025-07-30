import React, { memo } from "react"
import s from "./TaskItem.module.css"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { getListItem } from "./TaskItem.style.ts"
import { ListItem } from "@mui/material"
import { EnableSpan } from "@/common/components"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/todolists/api/_tasksApi.ts"

type props = {
  task: DomainTask
  todolist: DomainTodolist
}
export const TaskItem: React.FC<props> = memo(({ task, todolist }) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const onClickDeleteTask = () => {
    deleteTask({ todolistId: todolist.id, taskId: task.id })
  }

  const onChange = (value: boolean | string) => {
    let model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline,
      priority: task.priority,
      startDate: task.startDate,
    }

    if (typeof value === "string") {
      model = { ...model, title: value }
    }
    if (typeof value === "boolean") {
      model = { ...model, status: value ? TaskStatus.Completed : TaskStatus.New }
    }
    updateTask({ todolistId: todolist.id, taskId: task.id, model })
  }

  const isTaskCompleted = task.status === TaskStatus.Completed
  const isDisabled = todolist.entityStatus === "loading"

  return (
    <div className={s.taskDiv}>
      <ListItem key={task.id} sx={getListItem(isTaskCompleted)}>
        <Checkbox
          size={"small"}
          checked={isTaskCompleted}
          onChange={(e) => onChange(e.currentTarget.checked)}
          disabled={isDisabled}
        />
        <div className={s.taskContainer}>
          <EnableSpan text={task.title} changeTitle={onChange} disabled={isDisabled} />
          <IconButton style={{ padding: "0px" }} onClick={onClickDeleteTask} aria-label="delete" disabled={isDisabled}>
            <DeleteIcon />
          </IconButton>
        </div>
      </ListItem>
    </div>
  )
})
