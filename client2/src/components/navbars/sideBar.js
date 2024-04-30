import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        <List>
          {["Home", "Passwords", "Org", "Github"].map((text, index) => (
            <ListItem key={text} disablePadding>
               <Link to={index === 0 ? "/home" : index === 1 ? "/PasswordBank" : index === 2 ? "/org" : "https://github.com/Theismol/P4-Password-Manager/"}>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? <HomeIcon /> : index === 1 ? <LockIcon /> : index === 2 ? <PeopleIcon /> : <GitHubIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
