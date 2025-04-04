import type { RootState } from '@/app/store.ts'
import {TasksObjType} from "./tasks-reducer.ts";

export const selectTasks = (state: RootState): TasksObjType => state.tasks