import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import {NavButton} from "./NavButton";
import {Switch} from "@mui/material";
import React from "react";

type HeaderPropsType = {
    changeMode: ()=> void
}



export const Header: React.FC <HeaderPropsType> = (props) => {
    const {changeMode} = props
    const changeModeHandler = () => {
        changeMode()
    }
    return (
        <AppBar sx={{mb: '30px'}} position="static">
            <Toolbar>
                <Container maxWidth={'lg'}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                </Container>
                <NavButton>Sign in</NavButton>
                <NavButton>Sign up</NavButton>
                <NavButton>Faq</NavButton>
                <Switch color={'default'} onChange={changeModeHandler} />
            </Toolbar>
        </AppBar>
    );
};

