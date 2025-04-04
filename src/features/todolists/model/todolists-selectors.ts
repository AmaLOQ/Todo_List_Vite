import type { RootState } from '@/app/store.ts'
import {TodoListType} from "./todolists-reducer.ts";

export const selectTodolists = (state: RootState): TodoListType[] => state.todolists