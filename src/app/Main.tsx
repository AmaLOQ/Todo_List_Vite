import Grid from "@mui/material/Grid2";
import {AddItemForm} from "@/common/components/AddItemForm/AddItemForm.tsx";
import Container from "@mui/material/Container";
import {useCallback} from "react";
import {addTodoListAC} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists.tsx";

export const Main = () => {

    const dispatch = useAppDispatch();

    const onClickAddTodoList = useCallback((todoListTitle: string) => {
        dispatch(addTodoListAC(todoListTitle))
    }, [])

    return (
        <Container fixed maxWidth={'lg'}>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm label={'Add todo list'} addItem={onClickAddTodoList}/>
            </Grid>
            <Grid container spacing={4} rowSpacing={'50px'} >
                <Todolists/>
            </Grid>
        </Container>
    );
};

