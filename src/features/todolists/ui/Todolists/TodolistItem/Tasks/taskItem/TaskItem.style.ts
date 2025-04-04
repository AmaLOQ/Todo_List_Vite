import {SxProps} from "@mui/material";

export const getListItem = (isDone: boolean): SxProps => ({
    margin: "3px 0",
    display: "flex",
    padding: '0px',
    alignContent: "flex-end",
    opacity: isDone ? "0.5" : "1",
    textDecoration: isDone ? "line-through" : "none"
})