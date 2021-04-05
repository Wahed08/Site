import React from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 110;

const useStyles = makeStyles({
  page: {
    background: 'beige',
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
    
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'teal'
  },
  root: {
    display: "flex"
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();

  return (

      <div className={classes.root}>
        {/* side drawer */}
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.root}>
            <Typography variant="h4">Wahed</Typography>
          </div>
        </Drawer>

        <div className={classes.page}>{children}</div>
      </div>

  );
};

export default Layout;
