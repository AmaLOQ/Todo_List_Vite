import type { RootState } from '../app/store'
import {TasksObjType} from "./task-reducer.ts";

export const selectTasks = (state: RootState): TasksObjType => state.tasks