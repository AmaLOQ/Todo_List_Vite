import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    taskReducer,
    TasksObjType
} from "./task-reducer";
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";
import {beforeEach, test, expect} from "vitest";

let startState: TasksObjType

beforeEach(()=> {
    startState = {
        'todolistID1': [
            {id: '1', task: 'HTML', isDone: true},
            {id: '2', task: 'CSS', isDone: true},
            {id: '3', task: 'React', isDone: false},
            {id: '4', task: 'GraphSQL', isDone: false},
        ],
        'todolistID2': [
            {id: '1', task: 'Banana', isDone: true},
            {id: '2', task: 'Book', isDone: true},
            {id: '3', task: 'Cake', isDone: false},
            {id: '4', task: 'Juce', isDone: false},
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistID2')

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        'todolistID1': [
            {id: '1', task: 'HTML', isDone: true},
            {id: '2', task: 'CSS', isDone: true},
            {id: '3', task: 'React', isDone: false},
            {id: '4', task: 'GraphSQL', isDone: false},
        ],
        'todolistID2': [
            {id: '1', task: 'Banana', isDone: true},
            {id: '3', task: 'Cake', isDone: false},
            {id: '4', task: 'Juce', isDone: false},
        ]
    })
})
test('correct task should be added to correct array', () => {

    const taskTitle = 'Milk'

    const action = addTaskAC(taskTitle, 'todolistID2')

    const endState = taskReducer(startState, action)

    expect(endState['todolistID1'].length).toBe(4)
    expect(endState['todolistID2'].length).toBe(5)
    expect(endState['todolistID2'][4].task).toBe('Milk')
    expect(endState['todolistID2'][4].id).toBeDefined()
    expect(endState['todolistID2'][4].isDone).toBe(false)
})

test('correct task should change task status', () => {

    const action = changeTaskStatusAC('2', false, 'todolistID1')

    const endState = taskReducer(startState, action)

    expect(endState['todolistID1'][1].isDone).toBe(false)
    expect(endState['todolistID2'][1].isDone).toBe(true)
})

test('title of specified task should be change', () => {

    const action = changeTaskTitleAC('2', 'beer', 'todolistID2')

    const endState = taskReducer(startState, action)

    expect(endState['todolistID1'][1].task).toBe('CSS')
    expect(endState['todolistID2'][1].task).toBe('beer')
})
test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC('new Todolist')

    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)

    const newkey = keys.find(k => k != 'todolistID1' && k != 'todolistID2')
    if (!newkey) {
        throw  new Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newkey]).toEqual([])
})

test('property with todolist should be deleted', () => {

    const action = removeTodoListAC({todoListID: 'todolistID2'})

    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[1]).toBe(undefined)
})