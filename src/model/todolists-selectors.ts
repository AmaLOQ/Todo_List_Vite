import type { RootState } from '../app/store'
import {TodoListType} from "./todolists-reducer.ts";

export const selectTodolists = (state: RootState): TodoListType[] => state.todolists