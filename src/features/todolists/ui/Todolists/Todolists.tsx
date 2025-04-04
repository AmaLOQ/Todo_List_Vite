import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/features/todolists/model/todolists-selectors.ts";

export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    const mappedTodolists = todolists.map((todolist) => {
        return (
            <Grid key={todolist.id} style={{alignSelf: 'flex-start'}}>
                <Paper style={{marginRight: '25px', borderRadius: '10px'}} elevation={2} >
                    <TodolistItem
                        todolist={todolist}
                    />
                </Paper>
            </Grid>
        );
    });

    return (
        <>
            {mappedTodolists}
        </>
    );
};

