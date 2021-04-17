import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {
  AddCircleOutlineOutlined,
  SubjectOutlined,
  AccountCircleOutlined,
  ExitToAppOutlined,
} from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from '../context/auth-context';

const drawerWidth = 130;

const useStyles = makeStyles({
  page: {
    background: "beige",
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
    height: "100%"
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "aliceblue",
  },
  root: {
    display: "flex",
  },
  title: {
    paddingTop: "20px",
    paddingLeft: "17px",
    paddingBottom: "50px",
  },
  active: {
    background: "beige",
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const auth = useContext(AuthContext);

  const menuItems = [
    {
      text: "My Post",
      icon: <SubjectOutlined color="primary" />,
      path: "/posts",
    },
    {
      text: "Create Post",
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: "/post/create",
    },
    {
      text: "My Account",
      icon: <AccountCircleOutlined color="primary" />,
      path: `/${auth.userId}/account`,
    },
    {
      text: "Settings",
      icon: <ExitToAppOutlined color="primary" />,
      path: "/about",
    }
  ];

  return (
    <div className={classes.root}>
      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.title}>
          <Typography variant="h4">Wahed</Typography>
        </div>

        {/* List Item */}
        <List>
          {auth.isLoggedIn && menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>{children}</div>
    </div>
  );
};

export default Layout;
