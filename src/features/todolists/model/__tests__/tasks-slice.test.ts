import { describe, expect, test } from "vitest"
import { tasksReducer } from "../tasks-slice.ts"
import { createTodolistTC, deleteTodolistTC } from "../todolists-slice.ts"
import { fetchTasksTC, createTaskTC, deleteTaskTC, updateTaskTC } from "../tasks-slice.ts"
import { TasksState } from "../tasks-slice"
import { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { TaskPriority, TaskStatus } from "@/common/enums"

const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0,
}

describe("tasksSlice asyncThunk tests", () => {
  test("createTodolistTC.fulfilled should add empty array for new todolist", () => {
    const startState: TasksState = {
      todolistId1: [],
      todolistId2: [],
    }

    const newTodolist = {
      todolist: {
        id: "todolistId3",
        title: "New Todolist",
        addedDate: "",
        order: 0,
      },
    }

    const action = createTodolistTC.fulfilled(newTodolist, "requestId", newTodolist.todolist.title)

    const endState = tasksReducer({ tasks: startState }, action).tasks

    expect(Object.keys(endState).length).toBe(3)
    expect(endState["todolistId3"]).toEqual([])
  })

  test("deleteTodolistTC.fulfilled should remove tasks array of deleted todolist", () => {
    const startState: TasksState = {
      todolistId1: [],
      todolistId2: [],
    }

    const action = deleteTodolistTC.fulfilled({ todolistId: "todolistId2" }, "requestId", "todolistId2")

    const endState = tasksReducer({ tasks: startState }, action).tasks

    expect(Object.keys(endState).length).toBe(1)
    expect(endState["todolistId2"]).toBeUndefined()
  })

  test("fetchTasksTC.fulfilled should set tasks for specific todolist", () => {
    const startState: TasksState = {
      todolistId1: [],
      todolistId2: [],
    }

    const fetchedTasks: DomainTask[] = [
      {
        id: "1",
        title: "Task 1",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "Task 2",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ]

    const action = fetchTasksTC.fulfilled(
      { todolistId: "todolistId1", tasks: fetchedTasks },
      "requestId",
      "todolistId1",
    )

    const endState = tasksReducer({ tasks: startState }, action).tasks

    expect(endState["todolistId1"]).toEqual(fetchedTasks)
  })

  test("createTaskTC.fulfilled should add new task to beginning of array", () => {
    const startState: TasksState = {
      todolistId1: [
        {
          id: "1",
          title: "Old task",
          status: TaskStatus.New,
          todoListId: "todolistId1",
          ...taskDefaultValues,
        },
      ],
    }

    const newTask: DomainTask = {
      id: "2",
      title: "New task",
      status: TaskStatus.New,
      todoListId: "todolistId1",
      ...taskDefaultValues,
    }

    const action = createTaskTC.fulfilled({ task: newTask }, "requestId", {
      title: newTask.title,
      todolistId: newTask.todoListId,
    })

    const endState = tasksReducer({ tasks: startState }, action).tasks

    expect(endState["todolistId1"].length).toBe(2)
    expect(endState["todolistId1"][0]).toEqual(newTask)
  })

  test("deleteTaskTC.fulfilled should remove task from array", () => {
    const startState: TasksState = {
      todolistId1: [
        {
          id: "1",
          title: "Task 1",
          status: TaskStatus.New,
          todoListId: "todolistId1",
          ...taskDefaultValues,
        },
        {
          id: "2",
          title: "Task 2",
          status: TaskStatus.New,
          todoListId: "todolistId1",
          ...taskDefaultValues,
        },
      ],
    }

    const action = deleteTaskTC.fulfilled({ todolistId: "todolistId1", taskId: "1" }, "requestId", {
      todolistId: "todolistId1",
      taskId: "1",
    })

    const endState = tasksReducer({ tasks: startState }, action).tasks

    expect(endState["todolistId1"].length).toBe(1)
    expect(endState["todolistId1"][0].id).toBe("2")
  })

  test("updateTaskTC.fulfilled should update existing task", () => {
    const startState: TasksState = {
      todolistId1: [
        {
          id: "1",
          title: "Old Title",
          status: TaskStatus.New,
          todoListId: "todolistId1",
          ...taskDefaultValues,
        },
      ],
    }

    const updatedTask: DomainTask = {
      id: "1",
      title: "Updated Title",
      status: TaskStatus.Completed,
      todoListId: "todolistId1",
      ...taskDefaultValues,
    }

    const action = updateTaskTC.fulfilled({ task: updatedTask }, "requestId", {
      todolistId: "todolistId1",
      taskId: "1",
      domainModel: { title: "Updated Title", status: TaskStatus.Completed },
    })

    const endState = tasksReducer({ tasks: startState }, action).tasks

    expect(endState["todolistId1"].length).toBe(1)
    expect(endState["todolistId1"][0]).toEqual(updatedTask)
  })
})
