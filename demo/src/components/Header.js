import React,{useEffect, useState} from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
  makeStyles,
} from "@material-ui/core";
import {Routes, Route, useNavigate} from 'react-router-dom';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import SideMenu from "./SideMenu";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  searchInput: {
    opacity: "0.6",
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function Header() {
    const [authenticated, setauthenticated] = useState(null);
    const classes = useStyles();
    const navigate = useNavigate();
    useEffect(()=>{
        var user = auth.currentUser;  
        if(user){
            setauthenticated(user);
        }
    },[]);
    const handleLogin = () => {
        navigate('/');
      
    };
    const handleLogOut = () => {
      var user = auth.currentUser;
      if (user) {
        signOut(auth);
        setauthenticated(null)
        navigate('/');
      } 
    };
     


  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <InputBase
              placeholder="Search topics"
              className={classes.searchInput}
              startAdornment={<SearchIcon fontSize="small" />}
            />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color="secondary" overlap="rectangular">
                <NotificationsNoneIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="primary" overlap="rectangular">
                <ChatBubbleOutlineIcon fontSize="small" />
              </Badge>
            </IconButton>
            {!authenticated && 
            <IconButton onClick={handleLogin}>
              <LoginIcon  fontSize="small" /> 
            </IconButton>}
            {authenticated &&<IconButton onClick={handleLogOut}>
               <LogoutIcon  fontSize="small" /> 
            </IconButton>}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
