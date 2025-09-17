import { todolistApi } from "@/features/todolists/api/todolistApi"
import { RequestStatus } from "@/common/types"
import { AppThunk } from "@/app/store"

// thunk для смены статуса тудулиста
export const changeTodolistStatus =
  (entityStatus: RequestStatus, id: string): AppThunk =>
  (dispatch) => {
    dispatch(
      todolistApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((tl) => tl.id === id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),
    )
  }
