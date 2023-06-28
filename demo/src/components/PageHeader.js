import { Paper, Card, makeStyles } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import { Grid, IconButton, Badge } from "@material-ui/core";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  pageHeader: {
    padding: theme.spacing(4),
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  pageIcon: {
    display: "inline-block",
    padding: theme.spacing(2),
    color: "#3c44b1",
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
    },
  },
}));

export default function PageHeader(props) {
  const classes = useStyles();
  const { title, subTitle, icon, totalGold, totalSilver, totalInvestment } =
    props;
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Grid item>
            <IconButton>
            Gold Weight : {totalGold}
            </IconButton>
            <IconButton>
              Total Silver : {totalSilver}
            </IconButton>

            <IconButton >
           Total Investment : {totalInvestment}
            </IconButton>
          </Grid>
        </div>
      </div>
    </Paper>
  );
}
