import {v1} from "uuid";
import {
    addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './todolists-reducer';
import { beforeEach, expect, test } from 'vitest'
import {FilterType, TodoListType} from "./todolists-reducer.ts"

let firstTodoListID : string
let secondTodoListID : string

let startState: TodoListType[]

beforeEach(()=> {
    firstTodoListID = v1()
    secondTodoListID = v1()

    startState = [
        {id: firstTodoListID, title: 'What to learn', filter: 'All'},
        {id: secondTodoListID, title: 'What to buy', filter: 'All'}
    ]

})

test('correct todolist should be removed', ()=> {

    const action = removeTodoListAC(firstTodoListID)

    const endState = todoListsReducer(startState,action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(secondTodoListID)
})




test('correct todolist should be added', ()=> {

    const newTodoListTitle = 'What to see'

    const action = addTodoListAC(newTodoListTitle)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[2].filter).toBe('All')
})

test('correct todolist should change title', ()=> {

    const newTodoListTitle = 'New Title'

    const action = changeTodoListTitleAC(firstTodoListID, newTodoListTitle)

    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[1].title).toBe('What to buy')
})

test('correct todolist should change filter', ()=> {

    const newFilterValue: FilterType = 'Completed'

    const action = changeTodoListFilterAC(firstTodoListID, newFilterValue)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe(newFilterValue)
    expect(endState[1].filter).toBe('All')
})


