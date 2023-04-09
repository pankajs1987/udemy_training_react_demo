import Header from "../Header";
import SideMenu from "../SideMenu";
import { Outlet } from "react-router-dom";
import React from "react";
import PageHeader from "../PageHeader";
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import { StyledEngineProvider } from '@mui/material/styles';
import { createTheme } from '@material-ui/core/styles'
import {
  makeStyles,
  CssBaseline,
  ThemeProvider
} from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});

function RootLayout() {
    const classes = useStyles()
  return (
    <>
      <ThemeProvider theme={theme}>
        <SideMenu />
        <div className={classes.appMain}>
          <Header />
          <PageHeader
                title="Assets Details"
                subTitle="Let's Grow together..."
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
                <StyledEngineProvider injectFirst>
                <Outlet />
    </StyledEngineProvider>
         
          </div>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default RootLayout;
