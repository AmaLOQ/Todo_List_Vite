import {useCallback, useState} from "react";
import {TodoList} from "./components/TodoList/TodoList";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import './App.css'
import {Header} from "./components/Header/Header";
import Grid from '@mui/material/Grid2';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./model/store";
import {addTodoListAC, TodoListType} from "./model/todolists-reducer";
import {createTheme, ThemeProvider, CssBaseline} from "@mui/material";


export type ThemeModeType = "light" | "dark"

export const App = () => {
    console.log('app was called')

    const todoLists = useSelector<RootState, TodoListType[]>(state => state.todolists)

    const dispatch = useDispatch()

    const [themeMode, setThemeMode] = useState<ThemeModeType>('light')

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#ef6c00',
            },
        }
    })

    const onClickAddTodoList = useCallback((todoListTitle: string) => {
        dispatch(addTodoListAC(todoListTitle))
    }, [])

    const mappedTodoLists = todoLists.map((tl) => {
        return (
            <Grid style={{alignSelf: 'flex-start'}}>
                <Paper style={{marginRight: '25px', borderRadius: '10px'}} elevation={2} key={tl.id}>
                    <TodoList
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                    />
                </Paper>
            </Grid>

        );
    });

    return (
        <ThemeProvider theme={theme}>
            <div className={'app'}>
                <CssBaseline>
                    <Header changeMode={changeMode}/>
                    <Container fixed maxWidth={'lg'}>
                        <Grid container sx={{mb: '30px'}}>
                            <AddItemForm label={'Add todo list'} addItem={onClickAddTodoList}/>
                        </Grid>
                        <Grid container rowSpacing={'20px'} sx={{alignItems: 'flex-end'}}>
                            {mappedTodoLists}
                        </Grid>
                    </Container>
                </CssBaseline>
            </div>
        </ThemeProvider>
    );
}