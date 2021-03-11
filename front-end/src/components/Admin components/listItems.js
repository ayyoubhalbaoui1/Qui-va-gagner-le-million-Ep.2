import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import { Link } from 'react-router-dom'

const navStyle = {
    color : 'black',
    textDecoration: 'none'
}

export const mainListItems = (
  <div>
    <Link to='/Admin/Dashboard' style={navStyle}>
        <ListItem button>
        <ListItemIcon>
            <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Admins" />
        </ListItem>
    </Link>
    <Link to='/Admin/Participants' style={navStyle}>
        <ListItem button>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Participants" />
        </ListItem>
    </Link>
    <Link to='/Admin/Questions' style={navStyle}>
        <ListItem button>
        <ListItemIcon>
            <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Questions" />
        </ListItem>
    </Link>
  </div>
);
